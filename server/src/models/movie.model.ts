import { z } from "zod";

export const movieSchema = z.object({
  id: z.string().nanoid({ message: "Invalid id" }),
  tmdb_id: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  runtime: z.number(),
  release_date: z.string(),
  genres: z.array(z.string()),
  overview: z.string(),
  homepage: z.string(),
  poster_path: z.string(),
  popularity: z.number(),
  status: z.string(),
  vote_average: z.number(),
  media_type: z.enum(["movie", "tv"], { message: "Invalid media type" }),
  added_date: z.number().positive({ message: "Invalid date" }),
});

export type Movie = z.infer<typeof movieSchema>;
