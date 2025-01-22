import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { Series, insertSeriesSchema } from "../db/schema/series.schema";
import { getUser } from "../kinde";

export const seriesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const userId = c.var.user.id;

    const series = await db
      .select()
      .from(Series)
      .where(eq(Series.user_id, userId));

    if (!series.length) return c.notFound();

    return c.json(series);
  })
  // .get("/id/:id", getUser, async (c) => {
  //   const id = c.req.param("id");
  //   const userId = c.var.user.id;

  //   const series = await db
  //     .select()
  //     .from(Series)
  //     .where(and(eq(Series.user_id, userId), eq(Series._id, id)));

  //   if (!series.length) return c.notFound();

  //   return c.json(series[0]);
  // })
  .post("/", getUser, zValidator("json", insertSeriesSchema), async (c) => {
    const series = c.req.valid("json");
    const userId = c.var.user.id;

    const existingContent = await db
      .select()
      .from(Series)
      .where(and(eq(Series.user_id, userId), eq(Series.id, series.id)));

    if (existingContent.length) return c.text("Already exists", 409);

    const results = await db.insert(Series).values([series]);

    return c.json(results);
  })
  .delete("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const deleteSeries = await db
      .delete(Series)
      .where(and(eq(Series.user_id, userId), eq(Series.id, id)))
      .returning();

    if (!deleteSeries.length) return c.notFound();

    return c.json(deleteSeries);
  });

//TODO tests
