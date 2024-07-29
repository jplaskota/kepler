import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { omit } from "lodash";
import { nanoid } from "nanoid";
import { z } from "zod";
import { idSchema } from "../models/crud.model";
import { type Movie, movieSchema } from "../models/movie.model";
import { fakeMovies } from "../services/fakeContent";

const postMovieSchema = movieSchema
  .omit({
    tmdb_id: true,
    added_date: true,
  })
  .extend({
    id: z.string().min(1, { message: "Id is required" }),
  });

const router = new Hono()
  .get("/", (c) => {
    return c.json(fakeMovies);
  })
  .get("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");
    const content = fakeMovies.find((content) => content.id === id) as Movie;

    if (!content) return c.notFound();

    return c.json(content);
  })
  .post("/", zValidator("json", postMovieSchema), (c) => {
    const content = c.req.valid("json");

    const newContent: Movie = {
      id: nanoid(),
      tmdb_id: content.id,
      ...omit(content, "id"),
      added_date: Date.now(),
    };

    const parsedContent = movieSchema.parse(newContent);
    if (!parsedContent) return c.json({ error: "Invalid content" }, 400);

    fakeMovies.push(newContent);

    return c.json(newContent, 201);
  })
  .delete("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");
    const index = fakeMovies.findIndex((content) => content.id === id);

    if (index === -1) return c.notFound();

    const deletedContent = fakeMovies.splice(index, 1)[0];
    return c.json({
      deleted_content: deletedContent,
    });
  });

export default router;

//TODO tests
//TODO full json data fetch inside or outside post request ?
