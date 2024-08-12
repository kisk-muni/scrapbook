export { accounts, sessions, verificationTokens } from "./users";
export * from "./posts";
export * from "./profiles-to-posts";

import {
  pgTable,
  unique,
  pgEnum,
  timestamp,
  jsonb,
  uuid,
  text,
  bigint,
  json,
  index,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { profilesToPosts } from "./profiles-to-posts";

export const oneTimeTokenType = pgEnum("one_time_token_type", [
  "confirmation_token",
  "reauthentication_token",
  "recovery_token",
  "email_change_token_new",
  "email_change_token_current",
  "phone_change_token",
]);
export const equalityOp = pgEnum("equality_op", [
  "eq",
  "neq",
  "lt",
  "lte",
  "gt",
  "gte",
  "in",
]);
export const action = pgEnum("action", [
  "INSERT",
  "UPDATE",
  "DELETE",
  "TRUNCATE",
  "ERROR",
]);
export const requestStatus = pgEnum("request_status", [
  "PENDING",
  "SUCCESS",
  "ERROR",
]);
export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);

export const portfolioPages = pgTable(
  "portfolio_pages",
  {
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
    scrapedData: jsonb("scraped_data"),
    portfolioId: uuid("portfolio_id")
      .notNull()
      .references(() => portfolios.id),
    url: text("url").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    aiAnnotation: jsonb("ai_annotation"),
    annotatedAt: timestamp("annotated_at", {
      withTimezone: true,
      mode: "string",
    }),
    data: jsonb("data"),
  },
  (table) => {
    return {
      portfolioPagesUrlKey: unique("portfolio_pages_url_key").on(table.url),
      portfolioPagesIdKey: unique("portfolio_pages_id_key").on(table.id),
    };
  }
);

export const profilesSurveys = pgTable("profiles_surveys", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  results: json("results"),
  type: text("type"),
  profile: uuid("profile").references(() => profiles.id),
});

export const aiAnnotationLog = pgTable("ai_annotation_log", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  pageId: text("page_id"),
  pageUrl: text("page_url"),
  message: text("message"),
});

export const discordMessageReactions = pgTable(
  "discord_message_reactions",
  {
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
    emojiName: text("emoji_name").notNull(),
    discordUserId: varchar("discord_user_id").notNull(),
    emojiId: text("emoji_id"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    messageId: text("message_id")
      .notNull()
      .references(() => portfolioPosts.discordMessageId),
  },
  (table) => {
    return {
      idxDiscordMessageReactionsMessageId: index(
        "idx_discord_message_reactions_message_id"
      ).on(table.messageId),
    };
  }
);

export const portfolioPosts = pgTable(
  "portfolio_posts",
  {
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
    title: text("title"),
    url: varchar("url"),
    description: text("description"),
    publishedAt: timestamp("published_at", {
      withTimezone: true,
    }),
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    portfolioId: uuid("portfolio_id")
      .notNull()
      .references(() => portfolios.id),
    thumbnailUrl: text("thumbnail_url"),
    discordMessageId: text("discord_message_id"),
  },
  (table) => {
    return {
      idxPortfolioPostsDiscordMessageId: index(
        "idx_portfolio_posts_discord_message_id"
      ).on(table.discordMessageId),
      portfolioPostsUrlKey: unique("portfolio_posts_url_key").on(table.url),
      portfolioPostsDiscordMessageIdKey: unique(
        "portfolio_posts_discord_message_id_key"
      ).on(table.discordMessageId),
    };
  }
);

export type PortfolioPosts = typeof portfolioPosts.$inferSelect;

export const portfolioPostsRelations = relations(portfolioPosts, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [portfolioPosts.portfolioId],
    references: [portfolios.id],
  }),
}));

export const portfolios = pgTable(
  "portfolios",
  {
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
    name: varchar("name"),
    url: varchar("url"),
    feedUrl: varchar("feed_url"),
    platform: varchar("platform").default("custom").notNull(),
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    profileId: uuid("profile_id").references(() => profiles.id),
    title: varchar("title"),
    description: varchar("description"),
    imageUrl: varchar("image_url"),
    isPublic: boolean("is_public").default(false).notNull(),
    canBeUsedInResearch: boolean("can_be_used_in_research"),
  },
  (table) => {
    return {
      portfoliosUrlKey: unique("portfolios_url_key").on(table.url),
      portfoliosFeedUrlKey: unique("portfolios_feed_url_key").on(table.feedUrl),
    };
  }
);

export const portfoliosRelations = relations(portfolios, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [portfolios.profileId],
    references: [profiles.id],
  }),
  portfolioPosts: many(portfolioPosts),
}));

export const portfoliosDuplicate = pgTable(
  "portfolios_duplicate",
  {
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
    name: varchar("name"),
    url: varchar("url"),
    feedUrl: varchar("feed_url"),
    platform: varchar("platform").default("custom").notNull(),
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    profileId: uuid("profile_id").references(() => profiles.id),
    title: varchar("title"),
    description: varchar("description"),
    imageUrl: varchar("image_url"),
    isPublic: boolean("is_public").default(false).notNull(),
    studyStartSemesterYear: integer("study_start_semester_year"),
    studyStartSemesterKind: text("study_start_semester_kind"),
  },
  (table) => {
    return {
      portfoliosDuplicateFeedUrlKey: unique(
        "portfolios_duplicate_feed_url_key"
      ).on(table.feedUrl),
    };
  }
);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
    username: text("username"),
    fullName: text("full_name"),
    isPublic: boolean("is_public").default(false).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    studyStartSemesterYear: bigint("study_start_semester_year", {
      mode: "number",
    }),
    studyStartSemesterKind: text("study_start_semester_kind"),
    isTeacher: boolean("is_teacher"),
    canBeUsedInResearch: boolean("can_be_used_in_research"),
    name: text("name"),
    bio: text("bio"),
    email: text("email")
      .unique()
      .default(sql`uuid_generate_v4()`)
      .notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  },
  (table) => {
    return {
      prIdx: index("pr_index").on(
        table.id,
        table.username,
        table.isPublic,
        table.studyStartSemesterYear,
        table.studyStartSemesterKind
      ),
      profilesUsernameKey: unique("profiles_username_key").on(table.username),
    };
  }
);

export const profilesRelations = relations(profiles, ({ many }) => ({
  posts: many(profilesToPosts),
  profilesToPosts: many(profilesToPosts),
  portfolios: many(portfolios),
}));

export type Profile = typeof profiles.$inferSelect;
