import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const mediaEnum = pgEnum("media_type", ["movie", "series"]);

// Create the movies table
export const moviesTable = pgTable(
  "movies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    imdb_id: text("imdb_id").notNull(),
    title: text("title").notNull(),
    released: text("released").notNull(),
    genre: text("genre"),
    director: text("director"),
    actors: text("actors"),
    plot: text("plot"),
    country: text("country"),
    poster: text("poster"),
    imdb_rating: text("imdb_rating"),
    metascore: text("metascore"),
    rotten_tomatoes: text("rotten_tomatoes"),
    added_date: timestamp("added_date").notNull().defaultNow(),
    media_type: mediaEnum("media_type").default("movie"),
    user_id: text("user_id").notNull(),
  },
  (movie) => {
    return {
      userIdIndex: index("name_idx").on(movie.user_id),
    };
  }
);

export const insertMoviesSchema = createInsertSchema(moviesTable);
export const selectMoviesSchema = createSelectSchema(moviesTable);
