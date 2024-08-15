import { z } from "zod";

export const mediaTypeSchema = z.object({
  mediaType: z.enum(["movie", "tv"], { message: "Invalid media type" }),
});
