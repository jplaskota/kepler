import { z } from "zod";

export const contentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  img: z.string().min(1),
  date: z.string().min(4),
  running: z.string().min(1),
  director: z.string().min(3),
  type: z.enum(["movie", "series"]),
});

export type Content = z.infer<typeof contentSchema>;
