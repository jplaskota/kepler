import { z } from "zod";

const createdBySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

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

export const seriesSchema = z.object({
  created_by: z.array(createdBySchema),
  first_air_date: z.string(),
  genres: z.array(genreSchema),
  homepage: z.string(),
  id: z.string(),
  name: z.string(),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  seasons: z.array(seasonSchema),
  vote_average: z.number(),
  media_type: z.string(),
});

export type Series = z.infer<typeof seriesSchema>;
