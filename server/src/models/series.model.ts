import { z } from "zod";

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
export const seriesSearchSchema = z.object({
  id: z.string(),
  name: z.string(),
  first_air_date: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  vote_average: z.number(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
});

// Search by id from TMDB
export const seriesRawSchema = z.object({
  id: z.string(),
  name: z.string(),
  first_air_date: z.string(),
  genres: z.array(genreSchema),
  overview: z.string(),
  created_by: z.array(createdBySchema),
  homepage: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  seasons: z.array(seasonSchema),
  vote_average: z.number(),
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

export const seriesViewSchema = seriesSchema
  .omit({
    id: true,
    tmdb_id: true,
    added_date: true,
  })
  .extend({
    id: z.string().min(1, { message: "Id is required" }),
  });

export type Series = z.infer<typeof seriesSchema>;
export type SeriesSearch = z.infer<typeof seriesSearchSchema>;
export type SeriesRaw = z.infer<typeof seriesRawSchema>;
export type SeriesView = z.infer<typeof seriesViewSchema>;
