import { Client, Message, MessageReaction, User } from "discord.js";
import { NextFunction, Request, Response } from "express";

export type OnMessageHandler = (
  client: Client,
  message: Message
) => Promise<void>;

export type OnReactionHandler = (
  client: Client,
  reaction: MessageReaction,
  user: User
) => Promise<void>;

export type ApiPost = (
  req: Request,
  res: Response,
  next: NextFunction,
  client: Client
) => Promise<void>;
