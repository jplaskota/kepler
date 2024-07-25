import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { omit } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { fakeMovies } from "../services/fakeContent";
import { type Movie, movieSchema } from "../models/movie.model";
import { idSchema } from "../models/param.model";

const postMovieSchema = movieSchema.omit({
  tmdb_id: true,
  added_date: true,
});

const router = new Hono()
  .get("/", (c) => {
    return c.json(fakeMovies);
  })
  .get("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");
    const content = fakeMovies.find((content) => content.id === id) as Movie;

    if (!content) {
      return c.notFound();
    }

    return c.json(content);
  })
  .post("/", zValidator("json", postMovieSchema), (c) => {
    const content = c.req.valid("json");

    const newContent: Movie = {
      id: uuidv4(),
      tmdb_id: content.id,
      ...omit(content, "id"),
      added_date: Date.now(),
    };

    fakeMovies.push(newContent);

    c.status(201);
    return c.json(newContent);
  })
  .delete("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");
    const index = fakeMovies.findIndex((content) => content.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedContent = fakeMovies.splice(index, 1)[0];
    return c.json({ deleted_id: deletedContent.id });
  });

export default router;

//TODO tests
//TODO full json data fetch inside or outside post request ?