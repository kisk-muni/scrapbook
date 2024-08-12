-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "one_time_token_type" AS ENUM('confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "equality_op" AS ENUM('eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "action" AS ENUM('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "request_status" AS ENUM('PENDING', 'SUCCESS', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_pages" (
	"created_at" timestamp with time zone DEFAULT now(),
	"scraped_data" jsonb,
	"portfolio_id" uuid NOT NULL,
	"url" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ai_annotation" jsonb,
	"annotated_at" timestamp with time zone,
	"data" jsonb,
	CONSTRAINT "portfolio_pages_url_key" UNIQUE("url"),
	CONSTRAINT "portfolio_pages_id_key" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles_surveys" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"results" json,
	"type" text,
	"profile" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_annotation_log" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"page_id" text,
	"page_url" text,
	"message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discord_message_reactions" (
	"created_at" timestamp with time zone DEFAULT now(),
	"emoji_name" text NOT NULL,
	"discord_user_id" varchar NOT NULL,
	"emoji_id" text,
	"id" bigint PRIMARY KEY NOT NULL,
	"message_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_posts" (
	"created_at" timestamp with time zone DEFAULT now(),
	"title" text,
	"url" varchar,
	"description" text,
	"published_at" timestamp with time zone,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"portfolio_id" uuid NOT NULL,
	"thumbnail_url" text,
	"discord_message_id" text,
	CONSTRAINT "portfolio_posts_url_key" UNIQUE("url"),
	CONSTRAINT "portfolio_posts_discord_message_id_key" UNIQUE("discord_message_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolios" (
	"created_at" timestamp with time zone DEFAULT now(),
	"name" varchar,
	"url" varchar,
	"feed_url" varchar,
	"platform" varchar DEFAULT 'custom' NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"profile_id" uuid,
	"title" varchar,
	"description" varchar,
	"image_url" varchar,
	"is_public" boolean DEFAULT false NOT NULL,
	"can_be_used_in_research" boolean,
	CONSTRAINT "portfolios_url_key" UNIQUE("url"),
	CONSTRAINT "portfolios_feed_url_key" UNIQUE("feed_url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolios_duplicate" (
	"created_at" timestamp with time zone DEFAULT now(),
	"name" varchar,
	"url" varchar,
	"feed_url" varchar,
	"platform" varchar DEFAULT 'custom' NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"profile_id" uuid,
	"title" varchar,
	"description" varchar,
	"image_url" varchar,
	"is_public" boolean DEFAULT false NOT NULL,
	"study_start_semester_year" integer,
	"study_start_semester_kind" text,
	CONSTRAINT "portfolios_duplicate_feed_url_key" UNIQUE("feed_url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
	"username" text,
	"full_name" text,
	"is_public" boolean DEFAULT false NOT NULL,
	"study_start_semester_year" bigint,
	"study_start_semester_kind" text,
	"is_teacher" boolean,
	"can_be_used_in_research" boolean,
	CONSTRAINT "profiles_username_key" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_discord_message_reactions_message_id" ON "discord_message_reactions" ("message_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_portfolio_posts_discord_message_id" ON "portfolio_posts" ("discord_message_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pr_index" ON "profiles" ("id","username","is_public","study_start_semester_year","study_start_semester_kind");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_pages" ADD CONSTRAINT "portfolio_pages_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolios"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles_surveys" ADD CONSTRAINT "profiles_surveys_profile_fkey" FOREIGN KEY ("profile") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discord_message_reactions" ADD CONSTRAINT "discord_message_reactions_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."portfolio_posts"("discord_message_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_posts" ADD CONSTRAINT "portfolio_posts_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolios"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolios_duplicate" ADD CONSTRAINT "portfolios_duplicate_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/