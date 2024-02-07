import { Message, PartialMessage, TextChannel } from "discord.js";
import { ApiPost, OnReactionHandler } from "./types";
import { supabase } from "shared";

export const onReactionAdd: OnReactionHandler = async (
  client,
  reaction,
  user
) => {
  const { message, emoji } = reaction;
  if (!inScrapbookChannel(message)) return;
  const { error } = await supabase.from("discord_message_reactions").insert({
    message_id: message.id,
    emoji_name: emoji.name,
    discord_user_id: user.id,
    emoji_id: emoji.id,
  });

  if (error)
    console.error(
      `Couldnt insert discord_message_reaction ${message.id} ${error.message}.`
    );
  console.log(
    `${user.username} with id ${user.id} created "${emoji.name}" reaction on message ${message.id}.`
  );
};

export const onReactionRemove: OnReactionHandler = async (
  _client,
  reaction,
  user
) => {
  const { message, emoji } = reaction;
  if (!inScrapbookChannel(message)) return;
  const match: {
    message_id: string;
    emoji_name: string | null;
    discord_user_id: string;
    emoji_id?: string;
  } = {
    message_id: message.id,
    emoji_name: emoji.name,
    discord_user_id: user.id,
  };
  if (emoji.id) match.emoji_id = emoji.id;
  const { error } = await supabase
    .from("discord_message_reactions")
    .delete()
    .match(match);
  if (error)
    console.error(
      `Couldnt delete from discord_message_reactions ${message.id} ${error.message}.`
    );
  console.log(
    `${user.username} with id ${user.id} removed their "${emoji.name}" reaction on message ${message.id}.`
  );
};

export const collectOldReactions: ApiPost = async (req, res, next, client) => {
  // check auth
  const apiKey = req?.headers?.authorization?.substring("Bearer ".length);
  if (apiKey !== process.env.API_KEY)
    throw new Error("Provided API key is invalid.");
  // get discord channel
  const channel = client.channels.cache.get(
    /* eslint-disable  @typescript-eslint/no-non-null-assertion */
    process.env.SCRAPBOOK_CHANNEL_ID!
  ) as TextChannel | undefined;
  if (!channel) throw new Error("Posts channel not found.");
  console.log(
    "Re-collecting reactions including reactions on old messages in #scrapbook channel."
  );
  type ReactionEntry = {
    message_id: string;
    emoji_name: string | null;
    emoji_id: string | null;
    discord_user_id: string;
  };
  // get portfolio posts embedded in discord
  const { data: posts, error } = await supabase
    .from("portfolio_posts")
    .select("discord_message_id")
    .not("discord_message_id", "is", null);
  if (error) {
    res.json({ message: `Error fetching posts.` });
    return;
  }
  const reactionsByMessage: ReactionEntry[][] = [];
  // the dirty part of gathering messsage reactions and user info
  for (let i = 0; i <= posts.length - 1; i++) {
    let messageReactions: ReactionEntry[] = [];
    try {
      console.log(posts[i].discord_message_id);
      messageReactions = (
        await Promise.all(
          await channel.messages
            .fetch(posts[i].discord_message_id)
            .then((message) =>
              message.reactions.cache.map(async (reaction) =>
                reaction.users.fetch().then((users) =>
                  users.map((user) => {
                    return {
                      discord_user_id: user.id,
                      emoji_id: reaction.emoji.id,
                      emoji_name: reaction.emoji.name,
                      message_id: posts[i].discord_message_id,
                    };
                  })
                )
              )
            )
        )
      ).flat(2);
    } catch (error) {
      console.error(`Message ${posts[i].discord_message_id}, ${error}`);
    }
    reactionsByMessage.push(messageReactions);
  }
  const reactions = reactionsByMessage.flat(1);
  const { data, error: upsertError } = await supabase
    .from("discord_message_reactions")
    .upsert(reactions, { ignoreDuplicates: true })
    .select("id");
  if (!data || upsertError) {
    console.log(`Error upserting reactions ${upsertError.message}.`);
  }
  res.json({ message: `Collected ${data?.length} reactions.` });
};

function inScrapbookChannel(message: Message | PartialMessage) {
  if (
    ![
      process.env.SCRAPBOOK_CHANNEL_ID,
      process.env.SCRAPBOOK_TEST_CHANNEL_ID,
    ].includes(message.channelId)
  ) {
    console.log("Reaction not sent in Scrapbook channel.");
    return false;
  }
  console.log("Reaction sent in Scrapbook channel.");
  return true;
}
