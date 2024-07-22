import { z } from "zod";

export const movieSchema = z.object({
  id: z.string(),
  tmdb_id: z.string(),
  title: z.string(),
  runtime: z.number(),
  release_date: z.string(),
  genres: z.array(z.string()),
  overview: z.string(),
  homepage: z.string(),
  poster_path: z.string(),
  popularity: z.number(),
  status: z.string(),
  vote_average: z.number(),
  media_type: z.string(),
  added_date: z.number().positive(),
});

export type Movie = z.infer<typeof movieSchema>;
