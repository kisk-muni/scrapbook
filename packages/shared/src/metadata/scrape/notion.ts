import { SimplifiedContent } from "./base";

export type NotionUser = {
  object: "user";
  id: string;
};

export type DatabaseId = {
  type: "databaseId";
  databaseId: string;
};

export type PageId = {
  type: "pageId";
  pageId: string;
};

export type NotionDatabase<T extends "inline" | "child"> = {
  databaseType: T;
  object: "database";
  title?: string;
  description?: string;
  parent?: PageId;
  /**
   * Represents a notion database columns.
   * @experimental
   */
  properties?: any;
  /**
   * Represents a notion database pages.
   * @experimental
   */
  pages?: any;
};

export type NotionPage = {
  platform: "notion";
  notion?: {
    id?: string;
    createdTime?: string;
    createdBy?: NotionUser;
    lastEditedTime?: string;
    lastEditedBy?: NotionUser;
    publicUrl?: string;
    archived?: boolean;
  } & (
    | NotionDatabase<"child">
    | {
        object?: "page";
        title?: string;
        parent?: DatabaseId;
        /**
         * Represents a notion page blocks.
         */
        blocks?: any;
      }
  );
};
