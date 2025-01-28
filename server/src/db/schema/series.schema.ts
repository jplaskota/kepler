import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const mediaEnum = pgEnum("media_type", ["movie", "tv"]);

// Create the series table ( Home card only )
export const Series = pgTable(
  "series",
  {
    _id: uuid("id").primaryKey().defaultRandom(),
    tmdb_id: integer("tmdb_id").notNull(),
    name: text("name").notNull(),
    first_air_date: text("first_air_date").notNull(),
    genres: text("genres").array().notNull(),
    poster_path: text("poster_path"),
    number_of_seasons: integer("number_of_seasons").notNull(),
    vote_average: text("vote_average").notNull(),
    popularity: text("popularity").notNull(),
    added_date: timestamp("added_date").notNull().defaultNow(),
    media_type: mediaEnum("media_type").notNull(),
    user_id: text("user_id").notNull(),
  },
  (series) => {
    return {
      userIdIndex: index("series_idx").on(series.user_id),
    };
  }
);
