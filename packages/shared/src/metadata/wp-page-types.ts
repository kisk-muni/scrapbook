export const allowedWordPressPageTypes = [
  "home",
  "about",
  "contact",
  "blog",
  "links",
  "category",
  "tag",
  "paged",
  "error_page",
  "post",
  "page",
  "archive",
  "search",
  "other",
] as const;

export type WordPressPageType = (typeof allowedWordPressPageTypes)[number];
