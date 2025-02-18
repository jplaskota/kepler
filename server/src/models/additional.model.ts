import { z } from "zod";

export const ActorsSchema = z.array(
  z.object({
    id: z.number({ message: "Invalid actor id" }),
    original_name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable(),
    order: z.number(),
  })
);

export type TActors = z.infer<typeof ActorsSchema>;
