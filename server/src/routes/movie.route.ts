import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { insertMoviesSchema, moviesTable } from "../db/schema/movies.schema";
import { getUser } from "../kinde";

export const movieRoute = new Hono()
  .get("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const movie = await db
      .select()
      .from(moviesTable)
      .where(and(eq(moviesTable.user_id, userId), eq(moviesTable.id, id)));

    if (!movie.length) return c.notFound();

    return c.json(movie);
  })
  .post("/", getUser, zValidator("json", insertMoviesSchema), async (c) => {
    const movie = c.req.valid("json");
    const userId = c.var.user.id;

    const existingContent = await db
      .select()
      .from(moviesTable)
      .where(
        and(
          eq(moviesTable.user_id, userId),
          eq(moviesTable.imdb_id, movie.imdb_id)
        )
      );

    if (existingContent.length) return c.text("Already exists", 409);

    const results = await db.insert(moviesTable).values([movie]);

    return c.json(results, 201);
  })
  .delete("/id/:id", getUser, async (c) => {
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
