import { TextChannel, Client } from "discord.js";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const payloadSchema = z.object({
  channelId: z.string(),
  messageTextContent: z.string().min(1),
  // reactions: are not supported yet
});

export const postMessage = async (
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

    // parse message payload
    const { channelId: payloadChannelId, messageTextContent } =
      payloadSchema.parse(req.body);

    // get discord channel
    const channelId =
      req?.query?.env == "production"
        ? payloadChannelId
        : process.env.SCRAPBOOK_TEST_CHANNEL_ID;
    const channel = client.channels.cache.get(
      /* eslint-disable  @typescript-eslint/no-non-null-assertion */
      channelId!
    ) as TextChannel | undefined;
    if (!channel) {
      res.status(500).json({ message: `Posts channel not found.` });
      return;
    }
    if (!messageTextContent || messageTextContent.length === 0) {
      res.status(500).json({ message: `Message empty.` });
      return;
    }

    // send message
    await channel.send(messageTextContent);

    res.json({
      message: "The message was successfully posted.",
      payload: { payloadChannelId, messageTextContent },
    });
    return;
  } catch (error) {
    console.error(error);
    next(error);
  }
};
