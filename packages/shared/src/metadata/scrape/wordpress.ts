export const wpPageTypes = [
  "home",
  "blog",
  "privacy-policy",
  "date",
  "paged",
  "attachment",
  "error404",
  "category",
  "tag",
  "single",
  "page",
  "archive",
  "search",
] as const;

export type WordpressPageType = (typeof wpPageTypes)[number];

export type WordpressPage = {
  platform: "wordpress";
  wordpress?: {
    /**
     * List of page types. See {@link WPPageType}.
     * This is used to detect if the page is archive, post, homepage etc.
     *
     * @example
     * ['home', 'archive', 'page']
     */
    pageTypes?: string[];
  };
};
