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

export const seriesSchema = z.object({
  id: z.string().nanoid({ message: "Invalid id" }),
  tmdb_id: z.string().min(1, { message: "TMDB id is required" }),
  title: z.string().min(1, { message: "Title is required" }),
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
