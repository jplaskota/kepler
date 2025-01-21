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

const mediaEnum = pgEnum("media_type", ["movie", "tv"]);

// Create the movies table ( Home card only )
export const Movies = pgTable(
  "movies",
  {
    _id: uuid("id").primaryKey().defaultRandom(),
    id: text("tmdb_id").notNull(),
    imdb_id: text("imdb_id").notNull(),
    title: text("title").notNull(),
    runtime: integer("runtime").notNull(),
    release_date: text("release_date").notNull(),
    genres: text("genres").array().notNull(),
    poster_path: text("poster_path").notNull(),
    vote_average: integer("vote_average").notNull(),
    popularity: integer("popularity").notNull(),
    added_date: timestamp("added_date").notNull().defaultNow(),
    media_type: mediaEnum("media_type").notNull(),
    user_id: text("user_id").notNull(),
  },
  (movies) => {
    return {
      userIdIndex: index("name_idx").on(movies.user_id),
    };
  }
);

export const insertMediaSchema = createInsertSchema(Movies);
export const selectMediaSchema = createSelectSchema(Movies);
