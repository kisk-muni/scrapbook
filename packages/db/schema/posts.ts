import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  json,
  uuid,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { profilesToPosts } from "./profiles-to-posts";
import { Profile } from ".";

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  title: text("title"),
  slug: text("slug"),
  description: text("description"),
  html: text("html"),
  blocks: json("blocks"),
  isDraft: boolean("is_draft").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at", { mode: "date" }).defaultNow(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  lastEditedAt: timestamp("last_edited_at", { mode: "date" }).defaultNow(),
});

export type PostTable = typeof posts;

export type Post = typeof posts.$inferSelect;

export const postsRelations = relations(posts, ({ many }) => ({
  profiles: many(profilesToPosts),
}));

export type PostWithProfiles = InferSelectModel<typeof posts> & {
  profiles: Profile[];
};
