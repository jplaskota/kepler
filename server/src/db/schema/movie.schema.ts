import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const mediaEnum = pgEnum("media_type", ["movie", "tv"]);

export const moviesTable = pgTable("movies_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  tmdb_id: text("tmdb_id"),
  title: text("title").notNull(),
  runtime: integer("runtime"),
  release_date: text("release_date"),
  genres: text("genres").array(),
  overview: text("overview"),
  homepage: text("homepage"),
  poster_path: text("poster_path"),
  popularity: integer("popularity"),
  vote_average: integer("vote_average"),
  media_type: mediaEnum("media_type"),
  added_date: timestamp("added_date"),
  user_id: text("user_id").notNull(),
});

export type InsertMovies = typeof moviesTable.$inferInsert;
export type SelectMovies = typeof moviesTable.$inferSelect;
