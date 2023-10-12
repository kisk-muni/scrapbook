import { NotionPage } from "./notion";
import { WordpressPage } from "./wordpress";
import { BasePage } from "./base";

export * from "./base";
export * from "./notion";
export * from "./wordpress";

/**
 * Scraped and parsed data object
 *
 * @remarks
 * The data object is stored in separate data column with jsonb type.
 */
export type ScrapedPageData = BasePage & (NotionPage | WordpressPage);
