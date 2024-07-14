import { z } from "zod";

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const movieSchema = z.object({
  genres: z.array(genreSchema),
  homepage: z.string(),
  id: z.number(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  runtime: z.number(),
  status: z.string(),
  title: z.string(),
  vote_average: z.number(),
  media_type: z.string(),
});

export type Movie = z.infer<typeof movieSchema>;
