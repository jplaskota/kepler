import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { idSchema } from "../models/crud.model";
import {
  type Movie,
  movieSchema,
  movieViewSchema,
} from "../models/movie.model";
import { fakeMovies } from "../services/fakeContent";
import { getPostMovie } from "../utils/getFormattedContent";

export const movieRoute = new Hono()
  .get("/", (c) => {
    return c.json(fakeMovies);
  })
  .get("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");
    const content = fakeMovies.find((content) => content.id === id) as Movie;

    if (!content) return c.notFound();

    return c.json(content);
  })
  .post("/", zValidator("json", movieViewSchema), (c) => {
    const movie = c.req.valid("json");

    if (fakeMovies.some((c) => c.tmdb_id === movie.id))
      return c.text("Already exists", 409);

    const newContent: Movie = getPostMovie(movie);

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
    return c.json(deletedContent);
  });

//TODO tests
// TODO add pagination option
