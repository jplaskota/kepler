import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const mediaEnum = pgEnum("media_type", ["movie", "tv"]);

// Create the series table ( Home card only )
export const Series = pgTable(
  "series",
  {
    _id: uuid("id").primaryKey().defaultRandom(),
    id: text("tmdb_id").notNull(),
    name: text("name").notNull(),
    first_air_date: text("release_date").notNull(),
    genres: text("genres").array().notNull(),
    poster_path: text("poster_path").notNull(),
    number_of_seasons: integer("seasons").notNull(),
    vote_average: integer("vote_average").notNull(),
    popularity: integer("popularity").notNull(),
    added_date: timestamp("added_date").notNull().defaultNow(),
    media_type: mediaEnum("media_type").notNull().default("tv"),
    user_id: text("user_id").notNull(),
  },
  (series) => {
    return {
      userIdIndex: index("name_idx").on(series.user_id),
    };
  }
);

export const insertSeriesSchema = createInsertSchema(Series, {
  genres: z.array(z.string()),
});

