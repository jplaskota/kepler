import { z } from "zod";

const actorSchema = z.object({
  id: z.string().nonempty({ message: "Invalid actor id" }),
  original_name: z.string(),
  character: z.string(),
  profile_path: z.string(),
  order: z.number(),
});

export const MovieDetailedSchema = z.object({
  _id: z.string().uuid({ message: "Invalid movie id" }).optional(),
  id: z.string().nonempty({ message: "Invalid tmdb id" }),
  imdb_id: z.string().nonempty({ message: "Invalid imdb id" }),
  title: z.string().min(1, { message: "Title is required" }),
  release_date: z.string(),
  runtime: z.number(),
  director: z.string(), // * OMDB
  origin_country: z.array(z.string()),
  genres: z.array(z.string()),
  actors: z.array(actorSchema),
  overview: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string(),
  imdb_rating: z.string(), // * OMDB
  metascore: z.string(), // * OMDB
  rotten_tomatoes: z.string(), // * OMDB
  vote_average: z.number(),
  popularity: z.number(),
  added_date: z.date().optional(),
  media_type: z.enum(["movie", "series"], { message: "Invalid media type" }),
});

const genresSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const MovieRawDetailedSchema = MovieDetailedSchema.omit({
  genres: true,
}).extend({
  genres: z.array(genresSchema),
});

export const MovieCardSchema = MovieDetailedSchema.pick({
  _id: true,
  id: true,
  imdb_id: true,
  title: true,
  runtime: true,
  release_date: true,
  genres: true,
  poster_path: true,
  vote_average: true,
  popularity: true,
  added_date: true,
  media_type: true,
});

export const MovieRawCardSchema = MovieCardSchema.omit({
  genres: true,
}).extend({
  genre_ids: z.array(z.number()),
});

export type TMovieDetailed = z.infer<typeof MovieDetailedSchema>;
export type TMovieRawDetailed = z.infer<typeof MovieRawDetailedSchema>;
export type TMovieCard = z.infer<typeof MovieCardSchema>;
export type TMovieRawCard = z.infer<typeof MovieRawCardSchema>;
