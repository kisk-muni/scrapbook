export * from "./parsers";

export type Item = {
  label: string;
  value: string;
};

export type EmojiItem = Item & { emoji: string };
