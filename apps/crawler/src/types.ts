import { parseOpenGraph } from "crawlee";

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

export type WPPageType = (typeof wpPageTypes)[number];

/**
 * Parsed data object
 *
 * @remarks
 * The data object is stored in separate data column with jsonb type.
 * See database for live examples.
 */
export type Data = {
  /**
   * Web page title.
   *
   * @example
   * 'MOOC Reflection: convolutional neural networks in TensorFlow - Some blog'
   */
  title: string | null;

  /**
   * Short web page description.
   *
   * @example
   * My progress in second MOOC of DeepLearning.AI’s introduction to popular Tensorflow library.
   */
  description: string | null;

  /**
   * List of keywords provided by web author for better SEO.
   * This field is obsolete and no longer used as much, but some wordpress SEO plugins may enforce it.
   */
  keywords: string[];

  /**
   * ISO 8601 timestamp of article publishing.
   *
   * @example
   * '2023-01-27T14:02:16.000Z' (ISO 8601)
   */
  "published-at": string | null;

  /**
   * ISO 8601 timestamp of last article modification by its author.
   *
   * @example
   * '2023-01-27T14:02:16.000Z' (ISO 8601)
   */
  "updated-at": string | null;

  /**
   * List of wordpress page types. See {@link WPPageType}.
   * This is used to detect if the page is archive, post, homepage etc.
   *
   * @example
   * ['home', 'archive', 'page']
   */
  "wordpress-pagetypes"?: WPPageType[];

  /**
   * Post content data, aggregations and statistics.
   */
  "post-content": PostContent;

  /**
   * Open Graph meta data.
   * ‘The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook’.
   * See {@link https://ogp.me/ | Open Graph protocol}.
   */
  og?: ReturnType<typeof parseOpenGraph>;
};

/**
 * Post content data, aggregations, statistics and simplified html tree.
 */
export type PostContent = {
  /**
   * Post content text.
   */
  text: string | null;

  /**
   * Post content aggregations and statistics.
   */
  aggregate: PostContentAggregate;

  /**
   * Simplified html tree of post content.
   */
  tree: SimplifiedElement | null;
};

/**
 * Post content aggregations and statistics.
 */
export type PostContentAggregate = {
  /**
   * Estimated count of characters in post content.
   */
  charactersCount: number | null;

  /**
   * Estimated count of words in post content.
   */
  wordsCount: number | null;

  /**
   * List of standard web page links in post content.
   */
  links: string[];

  /**
   * Count of html tags in post content.
   *
   * @example
   * { p: 6, h1: 1, h2: 3, a: 1}
   */
  tagsCount: { [key: string]: number };

  /**
   * List of image urls in post content.
   */
  images: string[];

  /**
   * List of iframe urls in post content.
   */
  iframes: string[];
};

/**
 * Simplified HTML element/node.
 */
export type SimplifiedElement = {
  /**
   * Html tag name.
   */
  tagName?: string;

  /**
   * Node type (text, style, script, comment, etc).
   */
  type?: string;

  /**
   * Node text content.
   */
  text?: string;

  /**
   * Html tag attributes.
   *
   * @example
   * { src: 'https://example.com/image.jpg', alt: 'example image' }
   */
  attribs: { [key: string]: string };

  /**
   * List of child nodes.
   */
  children?: SimplifiedElement[];

  /**
   * Flag if node has text content.
   */
  containsText?: boolean;
};
