import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Movies as MoviesTable } from "../db/schema/movies.schema";

export const MovieActorSchema = z.object({
  id: z.number({ message: "Invalid actor id" }),
  original_name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number(),
});

// Search + DB
export const MovieSchema = z.object({
  _id: z.string().uuid({ message: "Invalid movie id" }), // when added to db
  tmdb_id: z.number({ message: "Invalid tmdb id" }), // TMDB id
  title: z.string().min(1, { message: "Title is required" }),
  release_date: z.string(),
  runtime: z.number(),
  director: z.string(), // * OMDB
  rated: z.string(), // * OMDB
  origin_country: z.array(z.string()),
  genres: z.array(z.string()),
  overview: z.string(),
  poster_path: z.string().nullable(), // sometimes is null
  backdrop_path: z.string().nullable(), // sometimes is null
  imdb_rating: z.string().optional(), // * OMDB | sometimes is null
  rotten_tomatoes: z.string().optional(), // * OMDB | sometimes is null
  vote_average: z.string(),
  popularity: z.string(),
  added_date: z.date(),
  media_type: z.enum(["movie", "series"], { message: "Invalid media type" }),
});

export const MovieSearchSchema = MovieSchema.omit({
  _id: true,
  added_date: true,
});

export const MovieTMDBSchema = MovieSearchSchema.omit({
  director: true,
  rated: true,
  imdb_rating: true,
  rotten_tomatoes: true,
  media_type: true,
  genres: true,
  tmdb_id: true,
}).extend({
  id: z.number(),
  imdb_id: z.string(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  vote_average: z.number().transform((val) => val.toFixed(1)),
  popularity: z.number().transform((val) => val.toFixed(1)),
});

export const MovieOMDBSchema = z.object({
  Rated: z.string(),
  Director: z.string(),
  Ratings: z.array(
    z.object({
      Source: z.string(),
      Value: z.string(),
    })
  ),
});

export const MovieSearchTMDBSchema = z.object({
  id: z.number(),
  title: z.string(),
  popularity: z.number().transform((val) => val.toFixed(1)),
  vote_average: z.number().transform((val) => val.toFixed(1)),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  genre_ids: z.array(z.number()),
});

export const MovieSearchCardSchema = z.object({
  tmdb_id: z.number(),
  title: z.string(),
  popularity: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.string(),
  genres: z.array(z.string()),
  media_type: z.enum(["movie", "series"]),
});

export const SelectMoviesSchema = createSelectSchema(MoviesTable, {
  genres: z.array(z.string()),
});
export const InsertMoviesSchema = createInsertSchema(MoviesTable, {
  genres: z.array(z.string()),
});

export type TMovie = z.infer<typeof MovieSchema>;
export type TMovieSearch = z.infer<typeof MovieSearchSchema>;
export type TMovieTMDB = z.infer<typeof MovieTMDBSchema>; // API
export type TMovieOMDB = z.infer<typeof MovieOMDBSchema>; // API
export type TMovieCard = z.infer<typeof SelectMoviesSchema>;
export type TMovieSearchCard = z.infer<typeof MovieSearchCardSchema>;
export type TMovieSearchTMDB = z.infer<typeof MovieSearchTMDBSchema>; // API

// TODO optional or nullable ?
