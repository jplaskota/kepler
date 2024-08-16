import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const mediaEnum = pgEnum("media_type", ["movie", "tv"]);

export const moviesTable = pgTable("movies_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  tmdb_id: text("tmdb_id").notNull(),
  title: text("title").notNull(),
  runtime: integer("runtime"),
  release_date: text("release_date"),
  genres: text("genres").array(),
  overview: text("overview"),
  homepage: text("homepage"),
  poster_path: text("poster_path").notNull(),
  popularity: numeric("popularity", { precision: 6, scale: 3 }),
  vote_average: numeric("vote_average", { precision: 5, scale: 3 }),
  media_type: mediaEnum("media_type"),
  added_date: timestamp("added_date").notNull().defaultNow(),
  user_id: text("user_id").notNull(),
});

export type InsertMovies = typeof moviesTable.$inferInsert;
export type SelectMovies = typeof moviesTable.$inferSelect;
