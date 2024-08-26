import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Define the enum for media types
const seriesEnum = pgEnum("media_type", ["movie", "tv"]);

// Create the series table
export const seriesTable = pgTable("series_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  tmdb_id: text("tmdb_id").notNull().unique(), // Add unique constraint
  title: text("title").notNull(),
  number_of_seasons: integer("number_of_seasons"),
  number_of_episodes: integer("number_of_episodes"),
  first_air_date: text("first_air_date"),
  genres: text("genres").array(),
  overview: text("overview"),
  created_by: text("created_by").array(),
  homepage: text("homepage"),
  poster_path: text("poster_path").notNull(),
  popularity: numeric("popularity", { precision: 7, scale: 2 }),
  vote_average: numeric("vote_average", { precision: 5, scale: 3 }),
  media_type: seriesEnum("media_type"),
  added_date: timestamp("added_date").notNull().defaultNow(),
  user_id: text("user_id").notNull(),
});

// Create the seasons table
export const seasonsTable = pgTable("seasons_table", {
  id: serial("id").primaryKey(),
  series_id: text("series_id")
    .notNull()
    .references(() => seriesTable.tmdb_id, {
      onDelete: "cascade",
    }),
  air_date: text("air_date"),
  episode_count: integer("episode_count"),
  name: text("name"),
  overview: text("overview"),
  poster_path: text("poster_path"),
  season_number: integer("season_number"),
  vote_average: numeric("vote_average", { precision: 5, scale: 3 }),
});

// Create the insert and select schemas for series and seasons
export const InsertSeriesSchema = createInsertSchema(seriesTable, {
  genres: z.array(z.string()),
  created_by: z.array(z.string()),
});
export const SelectSeriesSchema = createSelectSchema(seriesTable);

export const SelectSeasonsSchema = createSelectSchema(seasonsTable);
export const InsertSeasonsSchema = createInsertSchema(seasonsTable);
