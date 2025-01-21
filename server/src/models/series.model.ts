import { z } from "zod";

const actorSchema = z.object({
  id: z.string().nonempty({ message: "Invalid actor id" }),
  original_name: z.string(),
  character: z.string(),
  profile_path: z.string(),
  order: z.number(),
});

const seasonSchema = z.object({
  id: z.number(),
  air_date: z.string(),
  episode_count: z.number(),
  poster_path: z.string(),
  season_number: z.number(),
});

export const SeriesDetailedSchema = z.object({
  _id: z.string().uuid({ message: "Invalid id" }).optional(),
  id: z.string().min(1, { message: "TMDB id is required" }),
  imdb_id: z.string().nonempty({ message: "Invalid imdb id" }),
  name: z.string().min(1, { message: "Title is required" }),
  first_air_date: z.string(),
  number_of_seasons: z.number(),
  created_by: z.array(z.string()),
  origin_country: z.array(z.string()),
  genres: z.array(z.string()),
  actors: z.array(actorSchema),
  overview: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string(),
  imdb_rating: z.string(), // * OMDB
  metascore: z.string(), // * OMDB
  rotten_tomatoes: z.string(), // * OMDB
  seasons: z.array(seasonSchema),
  vote_average: z.number(),
  popularity: z.number(),
  added_date: z.date().optional(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
});

const genresSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const SeriesRawDetailedSchema = SeriesDetailedSchema.omit({
  genres: true,
}).extend({
  genres: z.array(genresSchema),
  external_ids: z.object({
    imdb_id: z.string(),
  }),
});

export const SeriesCardSchema = SeriesDetailedSchema.pick({
  _id: true,
  id: true,
  imdb_id: true,
  name: true,
  first_air_date: true,
  number_of_seasons: true,
  genres: true,
  poster_path: true,
  vote_average: true,
  popularity: true,
  added_date: true,
  media_type: true,
});

export const SeriesRawCardSchema = SeriesCardSchema.omit({
  genres: true,
}).extend({
  genre_ids: z.array(z.number()),
});

export type TSeriesDetailed = z.infer<typeof SeriesDetailedSchema>;
export type TSeriesRawDetailed = z.infer<typeof SeriesRawDetailedSchema>;
export type TSeriesCard = z.infer<typeof SeriesCardSchema>;
export type TSeriesRawCard = z.infer<typeof SeriesRawCardSchema>;
