import { z } from "zod";

export const SeriesActorSchema = z.object({
  id: z.string().nonempty({ message: "Invalid actor id" }),
  original_name: z.string(),
  character: z.string(),
  profile_path: z.string(),
  order: z.number(),
});

export const SeriesSeasonSchema = z.object({
  id: z.number(),
  air_date: z.string(),
  episode_count: z.number(),
  poster_path: z.string(),
  season_number: z.number(),
});

export const SeriesSchema = z.object({
  _id: z.string().uuid({ message: "Invalid id" }).optional(),
  id: z.number().min(1, { message: "TMDB id is required" }), // TMDB id
  imdb_id: z.string().nonempty({ message: "Invalid imdb id" }),
  name: z.string().min(1, { message: "Title is required" }),
  first_air_date: z.string(),
  number_of_seasons: z.number(),
  created_by: z.array(z.string()),
  origin_country: z.array(z.string()),
  genres: z.array(z.string()),
  actors: z.array(SeriesActorSchema),
  overview: z.string(),
  poster_path: z.string().nullable(), // poster path sometimes is null
  backdrop_path: z.string().optional(),
  imdb_rating: z.string().optional(), // * OMDB
  rotten_tomatoes: z.string().optional(), // * OMDB
  seasons: z.array(SeriesSeasonSchema),
  vote_average: z.number(),
  popularity: z.number(),
  added_date: z.date().optional(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
});

export const SeriesSearchSchema = SeriesSchema.omit({
  _id: true,
  added_date: true,
});

const genresSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const SeriesSearchTMDBSchema = SeriesSearchSchema.omit({
  actors: true,
  imdb_rating: true,
  rotten_tomatoes: true,
  seasons: true,
  media_type: true,
  genres: true,
}).extend({
  genres: z.array(genresSchema),
});

export const SeriesCardSchema = SeriesSchema.pick({
  _id: true,
  id: true, // TMDB id
  name: true,
  poster_path: true,
  first_air_date: true,
  number_of_seasons: true,
  vote_average: true,
  popularity: true,
  media_type: true,
  genres: true,
});

export const SeriesSearchCardSchema = SeriesCardSchema.omit({
  _id: true,
  number_of_seasons: true,
  media_type: true,
});

export const SeriesSearchCardTMDBSchema = SeriesSearchCardSchema.omit({
  genres: true,
}).extend({
  genre_ids: z.array(z.number()),
});

export type TSeries = z.infer<typeof SeriesSchema>;
export type TSeriesSearch = z.infer<typeof SeriesSearchSchema>;
export type TSeriesSearchTMDB = z.infer<typeof SeriesSearchTMDBSchema>;
export type TSeriesCard = z.infer<typeof SeriesCardSchema>;
export type TSeriesSearchCard = z.infer<typeof SeriesSearchCardSchema>;
export type TSeriesSearchCardTMDB = z.infer<typeof SeriesSearchCardTMDBSchema>;

// TODO optional or nullable ?
