import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import { fakeMovies } from "../fakeContent";
import { type Movie, movieSchema } from "../models/movie.model";

const postContentSchema = movieSchema.omit({ id: true });

const router = new Hono()
  .get("/", (c) => {
    return c.json(fakeMovies);
  })
  .get("/id/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");
    const content = fakeMovies.find((content) => content.id === id) as Movie;

    if (!content) {
      return c.notFound();
    }

    return c.json(content);
  })
  .post("/", zValidator("json", postContentSchema), (c) => {
    const content = c.req.valid("json");
    const newContent: Movie = { id: uuidv4(), ...content };

    fakeMovies.push(newContent);

    c.status(201);
    return c.json(newContent);
  })
  .delete("/id/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");
    const index = fakeMovies.findIndex((content) => content.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedContent = fakeMovies.splice(index, 1)[0];
    return c.json({ content: deletedContent });
  });

export default router;

//TODO tests
