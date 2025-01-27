DO $$ BEGIN
 CREATE TYPE "public"."media_type" AS ENUM('movie', 'tv');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" text NOT NULL,
	"title" text NOT NULL,
	"runtime" integer NOT NULL,
	"release_date" text NOT NULL,
	"genres" text[] NOT NULL,
	"poster_path" text NOT NULL,
	"vote_average" integer NOT NULL,
	"popularity" integer NOT NULL,
	"added_date" timestamp DEFAULT now() NOT NULL,
	"media_type" "media_type" DEFAULT 'movie' NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" text NOT NULL,
	"name" text NOT NULL,
	"first_air_date" text NOT NULL,
	"genres" text[] NOT NULL,
	"poster_path" text NOT NULL,
	"number_of_seasons" integer NOT NULL,
	"vote_average" integer NOT NULL,
	"popularity" integer NOT NULL,
	"added_date" timestamp DEFAULT now() NOT NULL,
	"media_type" "media_type" DEFAULT 'tv' NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "movies_idx" ON "movies" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "series_idx" ON "series" USING btree ("user_id");