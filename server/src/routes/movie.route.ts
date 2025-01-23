import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { Movies, insertMoviesSchema } from "../db/schema/movies.schema";
import { getUser } from "../kinde";

export const movieRoute = new Hono()
  .get("/", getUser, async (c) => {
    const userId = c.var.user.id;

    const movies = await db
      .select()
      .from(Movies)
      .where(eq(Movies.user_id, userId));

    if (!movies.length) return c.notFound();

    return c.json(movies);
  })
  .get("/detailed/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const movieExist = await db
      .select()
      .from(Movies)
      .where(and(eq(Movies.user_id, userId), eq(Movies.id, id)));

    if (!movieExist.length) return c.notFound();

    return c.json("movie details");
  })
  .post("/", getUser, zValidator("json", insertMoviesSchema), async (c) => {
    const movie = c.req.valid("json");
    const userId = c.var.user.id;

    const existingContent = await db
      .select()
      .from(Movies)
      .where(and(eq(Movies.user_id, userId), eq(Movies.id, movie.id)));

    if (existingContent.length) return c.text("Already exists", 409);

    const results = await db.insert(Movies).values({
      ...movie,
      user_id: userId,
    });

    return c.json(results, 201);
  })
  .delete("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const deleteMovie = await db
      .delete(Movies)
      .where(and(eq(Movies.user_id, userId), eq(Movies.id, id)))
      .returning();

    if (!deleteMovie.length) return c.notFound();

    return c.json(deleteMovie);
  });

// TODO tests
