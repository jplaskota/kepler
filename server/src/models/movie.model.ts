import { z } from "zod";

export const movieSearchSchema = z.object({
  id: z.string(),
  title: z.string(),
  release_date: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  vote_average: z.number(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
});

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const movieRawSchema = z.object({
  id: z.string(),
  title: z.string(),
  runtime: z.number(),
  release_date: z.string(),
  genres: z.array(genreSchema),
  overview: z.string(),
  homepage: z.string(),
  poster_path: z.string(),
  popularity: z.string(),
  vote_average: z.string(),
});

export const movieSchema = z.object({
  id: z.string().uuid({ message: "Invalid id" }),
  tmdb_id: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  runtime: z.number(),
  release_date: z.string(),
  genres: z.array(z.string()),
  overview: z.string(),
  homepage: z.string(),
  poster_path: z.string(),
  popularity: z.string(),
  vote_average: z.string(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
  added_date: z.date().optional(),
  user_id: z.string().min(1, { message: "User id is required" }),
});

export const movieViewSchema = movieSchema
  .omit({
    id: true,
    tmdb_id: true,
    added_date: true,
    user_id: true,
  })
  .extend({
    id: z.string().min(1, { message: "Id is required" }),
  });

export type Movie = z.infer<typeof movieSchema>;
export type MovieSearch = z.infer<typeof movieSearchSchema>;
export type MovieRaw = z.infer<typeof movieRawSchema>;
export type MovieView = z.infer<typeof movieViewSchema>;
