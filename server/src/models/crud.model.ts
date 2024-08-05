import { z } from "zod";
import { movieSchema } from "./movie.model";

export const idSchema = z.object({
  id: z.string().nanoid({ message: "Invalid id" }),
});
