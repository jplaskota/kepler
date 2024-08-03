import { z } from "zod";
import { search } from "./../../../client/src/services/api.services";
import { searchSeriesByName } from "./../../../client/src/services/search.services";

const seasonSchema = z.object({
  air_date: z.string(),
  episode_count: z.number(),
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  season_number: z.number(),
  vote_average: z.number(),
});

const createdBySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Search by name from TMDB
export const searchByNameSchema = z.object({
  id: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
});

// Search by id from TMDB
export const searchByIdSchema = z.object({
  id: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
  seasons: z.array(seasonSchema),
  genres: z.array(genreSchema),
  created_by: z.array(createdBySchema),
});

// My series schema
export const seriesSchema = z.object({
  id: z.string().nanoid({ message: "Invalid id" }),
  tmdb_id: z.string().min(1, { message: "TMDB id is required" }),
  name: z.string().min(1, { message: "Title is required" }),
  number_of_seasons: z.number(),
  number_of_episodes: z.number(),
  first_air_date: z.string(),
  genres: z.array(z.string()),
  overview: z.string(),
  created_by: z.array(z.string()),
  homepage: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  seasons: z.array(seasonSchema),
  vote_average: z.number(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
  added_date: z.number().positive({ message: "Invalid date" }),
});

export type Series = z.infer<typeof seriesSchema>;
export type SeriesNameSearchSchema = z.infer<typeof searchByNameSchema>;
export type SeriesIdSearchSchema = z.infer<typeof searchByIdSchema>;
