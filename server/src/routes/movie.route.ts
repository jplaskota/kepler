import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { InsertMoviesSchema, moviesTable } from "../db/schema/movie.schema";
import { getUser } from "../kinde";
import { idSchema } from "../models/crud.model";
import {
  type Movie,
  movieSchema,
  movieViewSchema,
} from "../models/movie.model";
import { getPostMovie } from "../utils/getFormattedContent";

export const movieRoute = new Hono()
  .get("/", getUser, async (c) => {
    const userId = c.var.user.id;

    const movies = await db
      .select()
      .from(moviesTable)
      .where(eq(moviesTable.user_id, userId));

    if (!movies.length) return c.notFound();

    return c.json(movies);
  })
  .get("/id/:id", getUser, zValidator("param", idSchema), async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const movie = await db
      .select()
      .from(moviesTable)
      .where(and(eq(moviesTable.user_id, userId), eq(moviesTable.tmdb_id, id)));

    if (!movie.length) return c.notFound();

    return c.json(movie);
  })
  .post("/", getUser, zValidator("json", InsertMoviesSchema), async (c) => {
    const movie = c.req.valid("json");
    const userId = c.var.user.id;

    const existingContent = await db
      .select()
      .from(moviesTable)
      .where(
        and(
          eq(moviesTable.user_id, userId),
          eq(moviesTable.tmdb_id, movie.tmdb_id)
        )
      );

    if (existingContent.length) return c.text("Already exists", 409);

    const newContent: Movie = getPostMovie(movie, userId);

    const parsedContent = movieSchema.parse(newContent);
    if (!parsedContent) return c.json({ error: "Invalid content" }, 400);

    const result = await db.insert(moviesTable).values([newContent]);

    return c.json(result, 201);
  })
  .delete("/id/:id", getUser, zValidator("param", idSchema), async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const deleteMovie = await db
      .delete(moviesTable)
      .where(and(eq(moviesTable.user_id, userId), eq(moviesTable.id, id)))
      .returning();

    if (!deleteMovie.length) return c.notFound();

    return c.json(deleteMovie);
  });

// TODO tests
// TODO add pagination option