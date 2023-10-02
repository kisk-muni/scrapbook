import {
  EmbedBuilder,
  TextChannel,
  Client,
  ThreadAutoArchiveDuration,
} from "discord.js";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "shared";
import { openai } from "shared";
import { stripHtml } from "string-strip-html";
import { parseISO, sub, isBefore } from "date-fns";

type PortfolioRecord = {
  title?: string;
  url?: string;
  feed_url?: string;
  image_url?: string;
  is_public: boolean;
};

const tableRecordSchema = z.object({
  id: z.string(),
  created_at: z.string().nullable(),
  title: z.string().nullable(),
  url: z.string().nullable(),
  description: z.string().nullable(),
  published_at: z.string().nullable(),
  portfolio_id: z.string(),
  thumbnail_url: z.string().nullable(),
  discord_message_id: z.string().nullable(),
});

const payloadSchema = z.object({
  type: z.enum(["INSERT", "UPDATE", "DELETE"]),
  table: z.string(),
  schema: z.string(),
  record: tableRecordSchema.nullable(),
  old_record: tableRecordSchema.nullable(),
});

export const syncPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
  client: Client
) => {
  try {
    // check auth
    const apiKey = req?.headers?.authorization?.substring("Bearer ".length);
    if (apiKey !== process.env.API_KEY) {
      res.status(500).json({ message: `API_KEY not found.` });
      return;
    }

    // parse supabase webhook payload
    // info: https://supabase.com/docs/guides/database/webhooks#payload
    const { type, record } = payloadSchema.parse(req.body);

    // get discord channel
    const channelId =
      req?.query?.env == "production"
        ? process.env.SCRAPBOOK_CHANNEL_ID
        : process.env.SCRAPBOOK_TEST_CHANNEL_ID;
    const channel = client.channels.cache.get(
      /* eslint-disable  @typescript-eslint/no-non-null-assertion */
      channelId!
    ) as TextChannel | undefined;
    if (!channel) {
      res.status(500).json({ message: `Posts channel not found.` });
      return;
    }

    if (type === "INSERT" && record) {
      // skip articles older thay 1 day
      if (record.published_at) {
        const publishedAt = parseISO(record.published_at);
        const dayBefore = sub(new Date(), {
          days: 1,
        });
        if (isBefore(publishedAt, dayBefore)) {
          res.json({ message: `Skipping old post ${type}.` });
          return;
        }
      }

      // discord message prerequisite:
      // get portfolio data
      const { data, error: portfolioError } = await supabase
        .from("portfolios")
        .select()
        .eq("id", record.portfolio_id)
        .limit(1)
        .single();
      if (portfolioError)
        throw new Error(`Couldnt find portfolio ${record.portfolio_id}`);
      const portfolio = data as PortfolioRecord;
      if (!portfolio.is_public) {
        res.json({ message: `Portfolio is not public.` });
        return;
      }
      // prepare discord message
      const embed = new EmbedBuilder()
        .setColor(0xfcda0b) // yellow
        .setTitle(record?.title || null)
        .setURL(record?.url || null)
        .setAuthor({
          name: portfolio?.title || portfolio?.url || "Beze jména",
          iconURL: portfolio?.image_url,
          url: `https://scrapbook.kisk.cz/portfolio?feed=${portfolio.feed_url}`,
        })
        .setImage(record?.thumbnail_url || null);
      if (record.description) {
        const plainTextDescription = stripHtml(record.description).result;
        embed.setDescription(truncate(plainTextDescription));
      }
      // send message
      const message = await channel.send({ embeds: [embed] });

      // save discord_message_id
      const { error: updatePortfolioPostError } = await supabase
        .from("portfolio_posts")
        .update({ discord_message_id: message.id })
        .eq("id", record.id);
      if (updatePortfolioPostError)
        console.log(
          `Updating discord_message_id on portfolio_post ${record.id} has failed.`
        );

      const thread = await message.startThread({
        name: record?.title || "Vlákno beze jména",
        autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
        reason: "Diskuze a zpětná vazba k příspěveku.",
      });
      console.log(`Created thread: ${thread.name}`);
      const prompt =
        "Napište nečekanou či vtipnou reakci pro autora studentského textu. Snažte se vyvarovat reakcím, které jsou příliš běžné a obecné. Abstraktní části vždy doplňujte konkrétními případy. Pokuste se pracovat s názorovou složkou, odkazovat na konkrétní pasáže textu, pokládat otázky pro zamyšlení a vylepšení textu a navazovat na původní text. Svou rekaci doplňte krátkým vtipem.\n\n" +
        "Autor: " +
        portfolio.title +
        "\n" +
        "URL studentského textu: " +
        record.url;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 1942,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      });

      if (response.status === 200 && response.data.choices[0].text) {
        await thread.send(response.data.choices[0].text);
      } else {
        console.log("Couldnt fetch openai response.");
      }

      res.json({ message: "The update was successfully posted to discord." });
      return;
    } else {
      res.json({ message: `Skipping ${type}.` });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

function truncate(str: string, maxLength = 300) {
  if (str.length > maxLength) {
    let truncatedString = str.substring(0, maxLength);
    const lastSpaceIndex = truncatedString.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      truncatedString = truncatedString.substring(0, lastSpaceIndex);
    }
    return truncatedString + "...";
  }
  return str;
}
