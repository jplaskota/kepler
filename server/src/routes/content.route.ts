import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { moviesTable } from "../db/schema/movies.schema";
import { seriesTable } from "../db/schema/series.schema";
import { getUser } from "../kinde";

export const contentRoute = new Hono()
  .get("/", getUser, async (c) => {
    const userId = c.var.user.id;

    const movies = await db
      .select()
      .from(moviesTable)
      .where(eq(moviesTable.user_id, userId));

    const series = await db
      .select()
      .from(seriesTable)
      .where(eq(seriesTable.user_id, userId));

    if (!movies.length && !series.length) return c.notFound();

    const allContent = [...movies, ...series].sort(
      (a, b) => b.added_date.getTime() - a.added_date.getTime()
    );

    return c.json(allContent);
  })
  .get("/title/:title", getUser, async (c) => {
    const title = c.req.param("title").toLowerCase();
    const userId = c.var.user.id;

    const movies = await db
      .select()
      .from(moviesTable)
      .where(
        and(eq(moviesTable.user_id, userId), eq(moviesTable.title, title))
      );

    const series = await db
      .select()
      .from(seriesTable)
      .where(
        and(eq(seriesTable.user_id, userId), eq(seriesTable.title, title))
      );

    if (!movies.length && !series.length) return c.notFound();

    const allContent = [...movies, ...series].sort(
      (a, b) => b.added_date.getTime() - a.added_date.getTime()
    );

    return c.json(allContent);
  });

// TODO tests
// TODO del redirect in get/id
// FIXME content by id
