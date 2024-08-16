DO $$ BEGIN
 CREATE TYPE "public"."media_type" AS ENUM('movie', 'tv');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movies_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" text,
	"title" text NOT NULL,
	"runtime" integer,
	"release_date" text,
	"genres" text[],
	"overview" text,
	"homepage" text,
	"poster_path" text,
	"popularity" integer,
	"vote_average" integer,
	"media_type" "media_type",
	"added_date" timestamp,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seasons_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"series_id" uuid,
	"air_date" text,
	"episode_count" integer,
	"name" text,
	"overview" text,
	"poster_path" text,
	"season_number" integer,
	"vote_average" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "series_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" text NOT NULL,
	"title" text NOT NULL,
	"number_of_seasons" integer,
	"number_of_episodes" integer,
	"first_air_date" text,
	"genres" text[],
	"overview" text,
	"created_by" text[],
	"homepage" text,
	"poster_path" text,
	"popularity" integer,
	"vote_average" integer,
	"media_type" "media_type",
	"added_date" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seasons_table" ADD CONSTRAINT "seasons_table_series_id_series_table_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
