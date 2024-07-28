import { z } from "zod";

export const idSchema = z.object({
  id: z.string().nanoid({ message: "Invalid id" }),
});
