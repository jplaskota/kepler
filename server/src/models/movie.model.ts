import { z } from "zod";

export const MovieActorSchema = z.object({
  id: z.string().nonempty({ message: "Invalid actor id" }),
  original_name: z.string(),
  character: z.string(),
  profile_path: z.string(),
  order: z.number(),
});

export const MovieSchema = z.object({
  _id: z.string().uuid({ message: "Invalid movie id" }),
  id: z.number({ message: "Invalid tmdb id" }), // TMDB id
  imdb_id: z.string().nonempty({ message: "Invalid imdb id" }),
  title: z.string().min(1, { message: "Title is required" }),
  release_date: z.string(),
  runtime: z.number(),
  director: z.string(), // * OMDB
  origin_country: z.array(z.string()),
  genres: z.array(z.string()),
  actors: z.array(MovieActorSchema),
  overview: z.string(),
  poster_path: z.string().nullable(), // poster path sometimes is null
  backdrop_path: z.string(),
  imdb_rating: z.string().optional(), // * OMDB
  rotten_tomatoes: z.string().optional(), // * OMDB
  vote_average: z.number(),
  popularity: z.number(),
  added_date: z.date(),
  media_type: z.enum(["movie", "series"], { message: "Invalid media type" }),
});

export const MovieSearchSchema = MovieSchema.omit({
  _id: true,
  added_date: true,
});

const genresSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const MovieSearchTMDBSchema = MovieSearchSchema.omit({
  director: true,
  actors: true,
  imdb_rating: true,
  rotten_tomatoes: true,
  media_type: true,
  genres: true,
}).extend({
  genres: z.array(genresSchema),
});

export const MovieCardSchema = MovieSchema.pick({
  _id: true,
  id: true, // TMDB id
  title: true,
  poster_path: true,
  release_date: true,
  runtime: true,
  vote_average: true,
  popularity: true,
  media_type: true,
  genres: true,
});

export const MovieSearchCardSchema = MovieCardSchema.omit({
  _id: true,
  runtime: true,
  media_type: true,
});

export const MovieSearchCardTMDBSchema = MovieSearchCardSchema.omit({
  genres: true,
}).extend({
  genre_ids: z.array(z.number()),
});

export type TMovie = z.infer<typeof MovieSchema>;
export type TMovieSearch = z.infer<typeof MovieSearchSchema>;
export type TMovieSearchTMDB = z.infer<typeof MovieSearchTMDBSchema>;
export type TMovieCard = z.infer<typeof MovieCardSchema>;
export type TMovieSearchCard = z.infer<typeof MovieSearchCardSchema>;
export type TMovieSearchCardTMDB = z.infer<typeof MovieSearchCardTMDBSchema>;

// TODO optional or nullable ?
