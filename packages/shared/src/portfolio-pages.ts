/**
 * Scrapbook portfolio_pages row schema
 * */
export type DatabaseEntry = {
  /**
   * Timestamp of the entry, must be in ISO string format
   * https://github.com/orgs/supabase/discussions/2839
   */
  createdAt?: string;

  /**
   * Timestamp of the crawl, must be in ISO string format
   */
  // crawledAt?: string;

  /**
   * todo: Not specified yet
   */
  data?: any;

  /**
   * uuid of the portfolio in Scrapbook
   */
  portfolioId: string;

  /**
   * Url of the crawled page, is also a primary key
   */
  url: string;

  /**
   * Timestamp of last change of the entry, must be in ISO string format
   */
  updatedAt?: string;

  /**
   * Date of the page or post publishing, must be in ISO string format
   */
  publishedAt?: string | null;

  /**
   * Scraped text content of the page
   */
  text?: string | null;

  /**
   * Scraped title of the page
   */
  title?: string | null;

  /**
   * Scraped Description of the page
   */
  description?: string | null;

  /**
   * Aggregated statistics of the page content
   */
  aggregation?: {
    charactersCount: number | null;
    wordsCount: number | null;
    links: string[];
    iframes: string[];
    images: string[];
    tagsCount: {
      [tagName: string]: number;
    };
  };

  /**
   * Not specified yet
   */
  category?: string | null;

  /**
   * AI embeddings, not specified yet
   */
  embedding?: any;

  aiPageTypes?: PageType[] | null;
  aiPostTypes?: PostType[] | null;
  aiTones?: Tone[] | null;
  aiTags?: string[] | null;
  aiCourses?: string[] | null;
  aiProfilations?: Profilation[] | null;
  aiHasSelfEvaluation?: boolean | null;
  aiSelfEvaluationTones?: Tone[] | null;
  aiDominantLanguage?: string | null;
  aiSummary?: string | null;
};

export const allowedPostTypes = [
  "research",
  "essay",
  "collection",
  "review",
  "course_reflection",
  "reflection",
  "tutorial",
  "interview",
  "infographics",
  "creative",
] as const;

type PostType = (typeof allowedPostTypes)[number];

export const allowedPageTypes = [
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

export type PageType = (typeof allowedPageTypes)[number];

export const allowedProfilations = [
  "design",
  "analytics",
  "edtech",
  "librarianship",
] as const;

export type Profilation = (typeof allowedProfilations)[number];

export const allowedTones = [
  "disheartened",
  "accusatory",
  "worried",
  "curious",
  "surprised",
  "disapporved",
  "unassuming",
  "formal",
  "assertive",
  "confident",
  "appreciative",
  "concerned",
  "sad",
  "informal",
  "regretful",
  "encouraging",
  "egocentric",
  "joyful",
  "optimistic",
  "excited",
] as const;

export type Tone = (typeof allowedTones)[number];
