import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const mediaEnum = pgEnum("media_type", ["movie", "series"]);

// Create the series table
export const seriesTable = pgTable(
  "series",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    imdb_id: text("tmdb_id").notNull(),
    title: text("title").notNull(),
    released: text("released").notNull(),
    genre: text("genre"),
    creator: text("creator"),
    actors: text("actors"),
    plot: text("plot"),
    country: text("country"),
    poster: text("poster"),
    seasons: text("seasons"),
    imdb_rating: text("imdb_rating"),
    metascore: text("metascore"),
    rotten_tomatoes: text("rotten_tomatoes"),
    added_date: timestamp("added_date").notNull().defaultNow(),
    media_type: mediaEnum("media_type").default("series"),
    user_id: text("user_id").notNull(),
  },
  (series) => {
    return {
      userIdIndex: index("name_idx").on(series.user_id),
    };
  }
);

export const insertSeriesSchema = createInsertSchema(seriesTable);
export const selectSeriesSchema = createSelectSchema(seriesTable);
