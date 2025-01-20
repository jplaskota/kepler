import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { insertSeriesSchema, seriesTable } from "../db/schema/movies.schema";
import { getUser } from "../kinde";

export const seriesRoute = new Hono()
  .get("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const series = await db
      .select()
      .from(seriesTable)
      .where(and(eq(seriesTable.user_id, userId), eq(seriesTable.id, id)));

    if (!series.length) return c.notFound();

    return c.json(series[0]);
  })
  .post("/", getUser, zValidator("json", insertSeriesSchema), async (c) => {
    const series = c.req.valid("json");
    const userId = c.var.user.id;

    const existingContent = await db
      .select()
      .from(seriesTable)
      .where(
        and(
          eq(seriesTable.user_id, userId),
          eq(seriesTable.imdb_id, series.imdb_id)
        )
      );

    if (existingContent.length) return c.text("Already exists", 409);

    const results = await db.insert(seriesTable).values([series]);

    return c.json(results);
  })
  .delete("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const deleteSeries = await db
      .delete(seriesTable)
      .where(and(eq(seriesTable.user_id, userId), eq(seriesTable.id, id)))
      .returning();

    if (!deleteSeries.length) return c.notFound();

    return c.json(deleteSeries);
  });

//TODO tests
