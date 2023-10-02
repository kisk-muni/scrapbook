import {
  REST,
  Routes,
  Events,
  Client,
  GatewayIntentBits,
  Partials,
  User,
  MessageReaction,
} from "discord.js";
import bodyParser from "body-parser";
import { syncPost } from "./sync-post";
import express from "express";
import {
  collectOldReactions,
  onReactionAdd,
  onReactionRemove,
} from "./collect-reactions";
import { postMessage } from "./post-message";

if (!process.env.DISCORD_BOT_TOKEN)
  throw new Error("Missing DISCORD_BOT_TOKEN.");
if (!process.env.DISCORD_APP_CLIENT_ID)
  throw new Error("Missing DISCORD_APP_CLIENT_ID.");
if (!process.env.SCRAPBOOK_CHANNEL_ID)
  throw new Error("Missing SCRAPBOOK_CHANNEL_ID.");
if (!process.env.SCRAPBOOK_TEST_CHANNEL_ID)
  throw new Error("Missing SCRAPBOOK_TEST_CHANNEL_ID.");
if (!process.env.API_KEY) throw new Error("Missing API_KEY.");
if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
if (!process.env.SUPABASE_API_URL) throw new Error("Missing SUPABASE_API_URL.");
if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY.");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      /* eslint-disable  @typescript-eslint/no-non-null-assertion */
      Routes.applicationCommands(process.env.DISCORD_APP_CLIENT_ID!),
      { body: commands }
    );
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (user.partial) {
    try {
      await user.fetch();
    } catch (error) {
      console.log("Error while trying to fetch an user", error);
    }
  }

  if (reaction.message.partial) {
    try {
      await reaction.message.fetch();
    } catch (error) {
      console.log("Error while trying to fetch a reaction message", error);
    }
  }
  if (reaction.partial) {
    try {
      const fetchedReaction = await reaction.fetch();
      onReactionAdd?.(client, fetchedReaction, user as User);
    } catch (error) {
      console.log("Error while trying to fetch a reaction", error);
    }
  } else {
    onReactionAdd?.(client, reaction as MessageReaction, user as User);
  }
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
  if (user.partial) {
    try {
      await user.fetch();
    } catch (error) {
      console.log("Error while trying to fetch an user", error);
    }
  }

  if (reaction.message.partial) {
    try {
      await reaction.message.fetch();
    } catch (error) {
      console.log("Error while trying to fetch a reaction message", error);
    }
  }
  if (reaction.partial) {
    try {
      const fetchedReaction = await reaction.fetch();
      onReactionRemove?.(client, fetchedReaction, user as User);
    } catch (error) {
      console.log("Error while trying to fetch a reaction", error);
    }
  } else {
    onReactionRemove?.(client, reaction as MessageReaction, user as User);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.post("/sync-post", (req, res, next) => syncPost(req, res, next, client));
app.post("/collect-old-reactions", (req, res, next) =>
  collectOldReactions(req, res, next, client)
);
app.post("/post-message", (req, res, next) =>
  postMessage(req, res, next, client)
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
