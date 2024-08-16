import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { moviesTable } from "../db/schema/movie.schema";
import { seriesTable } from "../db/schema/series.schema";
import { getUser } from "../kinde";
import { idSchema } from "../models/crud.model";

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
  .get("/id/:id", getUser, zValidator("param", idSchema), async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const movies = await db
      .select()
      .from(moviesTable)
      .where(and(eq(moviesTable.user_id, userId), eq(moviesTable.id, id)));

    if (movies.length) return c.json(movies[0]);

    const series = await db
      .select()
      .from(seriesTable)
      .where(and(eq(seriesTable.user_id, userId), eq(seriesTable.id, id)));

    if (series.length) return c.json(series[0]);

    return c.notFound();
  })
  .get("/title/:title", getUser, async (c) => {
    const title = c.req.param("title").toLowerCase();
    const userId = c.var.user.id;

    const movies = await db
      .select()
      .from(moviesTable)
      .where(and(eq(moviesTable.user_id, userId)));

    const series = await db
      .select()
      .from(seriesTable)
      .where(and(eq(seriesTable.user_id, userId)));

    const filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().includes(title)
    );

    const filteredSeries = series.filter((s) =>
      s.title.toLowerCase().includes(title)
    );

    if (!filteredMovies.length && !filteredSeries.length) return c.notFound();

    const allContent = [...filteredMovies, ...filteredSeries].sort(
      (a, b) => b.added_date.getTime() - a.added_date.getTime()
    );

    return c.json(allContent);
  });

// TODO tests
// TODO del redirect in get/id
// FIXME content by id
