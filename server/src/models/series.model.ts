import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Series as SeriesTable } from "../db/schema/series.schema";

export const SeasonSchema = z.array(
  z.object({
    id: z.number({ message: "Invalid season id" }),
    air_date: z.string().nullable(), // in specials season can be null
    episode_count: z.number(),
    poster_path: z.string().nullable(),
    season_number: z.number(),
  })
);

export const SeriesSchema = z.object({
  _id: z.string().uuid({ message: "Invalid id" }),
  tmdb_id: z.number().min(1, { message: "TMDB id is required" }), // TMDB id
  name: z.string().min(1, { message: "Title is required" }),
  first_air_date: z.string(),
  number_of_seasons: z.number(),
  created_by: z.array(z.string()),
  rated: z.string(), // * OMDB
  origin_country: z.array(z.string()),
  genres: z.array(z.string()),
  overview: z.string(),
  poster_path: z.string().nullable(), // sometimes is null
  backdrop_path: z.string().nullable(), // sometimes is null
  imdb_rating: z.string().optional(), // * OMDB | sometimes is null
  rotten_tomatoes: z.string().optional(), // * OMDB | sometimes is null
  seasons: SeasonSchema,
  vote_average: z.string(),
  popularity: z.string(),
  added_date: z.date(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
});

export const SeriesSearchSchema = SeriesSchema.omit({
  _id: true,
  added_date: true,
});

export const SeriesTMDBSchema = SeriesSearchSchema.omit({
  rated: true, // * OMDB
  imdb_rating: true, // * OMDB
  rotten_tomatoes: true, // * OMDB
  media_type: true, // * added manually
  genres: true,
  created_by: true,
  tmdb_id: true,
}).extend({
  id: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  external_ids: z.object({
    imdb_id: z.string(),
  }),
  created_by: z.array(
    z.object({
      name: z.string(),
    })
  ),
  vote_average: z.number().transform((val) => val.toFixed(1)),
  popularity: z.number().transform((val) => val.toFixed(1)),
});

export const SeriesOMDBSchema = z.object({
  Rated: z.string(),
  Director: z.string(),
  Ratings: z.array(
    z.object({
      Source: z.string(),
      Value: z.string(),
    })
  ),
});

export const SeriesSearchTMDBSchema = z.object({
  id: z.number(),
  name: z.string(),
  popularity: z.number().transform((val) => val.toFixed(1)),
  poster_path: z.string().nullable(),
  first_air_date: z.string(),
  vote_average: z.number().transform((val) => val.toFixed(1)),
  genre_ids: z.array(z.number()),
});

export const SeriesSearchCardSchema = z.object({
  tmdb_id: z.number(),
  name: z.string(),
  popularity: z.string(),
  poster_path: z.string().nullable(),
  first_air_date: z.string(),
  vote_average: z.string(),
  genres: z.array(z.string()),
  media_type: z.enum(["movie", "tv"]),
});

export const SelectSeriesSchema = createSelectSchema(SeriesTable, {
  genres: z.array(z.string()),
});
export const InsertSeriesSchema = createInsertSchema(SeriesTable, {
  genres: z.array(z.string()),
});

export type TSeries = z.infer<typeof SeriesSchema>;
export type TSeason = z.infer<typeof SeasonSchema>;
export type TSeriesSearch = z.infer<typeof SeriesSearchSchema>;
export type TSeriesTMDB = z.infer<typeof SeriesTMDBSchema>; // API
export type TSeriesOMDB = z.infer<typeof SeriesOMDBSchema>; // API
export type TSeriesCard = z.infer<typeof SelectSeriesSchema>;
export type TSeriesSearchCard = z.infer<typeof SeriesSearchCardSchema>;
export type TSeriesSearchTMDB = z.infer<typeof SeriesSearchTMDBSchema>; // API

// TODO optional or nullable ?
