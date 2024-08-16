ALTER TABLE "movies_table" ALTER COLUMN "poster_path" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "movies_table" ALTER COLUMN "popularity" SET DATA TYPE numeric(6, 3);--> statement-breakpoint
ALTER TABLE "movies_table" ALTER COLUMN "vote_average" SET DATA TYPE numeric(5, 3);--> statement-breakpoint
ALTER TABLE "series_table" ALTER COLUMN "poster_path" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "series_table" ALTER COLUMN "popularity" SET DATA TYPE numeric(6, 3);--> statement-breakpoint
ALTER TABLE "series_table" ALTER COLUMN "vote_average" SET DATA TYPE numeric(5, 3);