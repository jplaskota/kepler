import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { seasonsTable, seriesTable } from "../db/schema/series.schema";
import { getUser } from "../kinde";
import { idSchema } from "../models/crud.model";
import {
  type Series,
  seriesSchema,
  seriesViewSchema,
} from "../models/series.model";
import { getPostSeries } from "../utils/getFormattedContent";

export const seriesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const userId = c.var.user.id;

    const series = await db
      .select()
      .from(seriesTable)
      .where(eq(seriesTable.user_id, userId));

    if (!series.length) return c.notFound();

    return c.json(series);
  })
  .get("/id/:id", getUser, zValidator("param", idSchema), async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    const series = await db
      .select()
      .from(seriesTable)
      .where(and(eq(seriesTable.user_id, userId), eq(seriesTable.id, id)));

    if (!series.length) return c.notFound();

    return c.json(series[0]);
  })
  .post("/", getUser, zValidator("json", seriesViewSchema), async (c) => {
    const series = c.req.valid("json");
    const userId = c.var.user.id;

    const existingContent = await db
      .select()
      .from(seriesTable)
      .where(
        and(eq(seriesTable.user_id, userId), eq(seriesTable.tmdb_id, series.id))
      );

    if (existingContent.length) return c.text("Already exists", 409);

    const newContent: Series = getPostSeries(series, userId);

    const parsedContent = seriesSchema.parse(newContent) as Series;
    if (!parsedContent) return c.json({ error: "Invalid content" }, 403);

    const seasons = parsedContent.seasons.map((season) => {
      return {
        ...season,
        series_id: parsedContent.id,
      };
    });

    const results = db.transaction(async (trx) => {
      const resultsSeries = await trx
        .insert(seriesTable)
        .values(parsedContent)
        .returning();

      const resultsSeasons = await trx
        .insert(seasonsTable)
        .values(seasons)
        .returning();

      return {
        series: resultsSeries,
        seasons: resultsSeasons,
      };
    });

    return c.json(results);
  })
  .delete("/id/:id", getUser, zValidator("param", idSchema), async (c) => {
    const id = c.req.param("id") as string;
    const userId = c.var.user.id;

    const deleteSeries = await db
      .delete(seriesTable)
      .where(and(eq(seriesTable.user_id, userId), eq(seriesTable.id, id)))
      .returning();

    if (!deleteSeries.length) return c.notFound();

    return c.json(deleteSeries);
  });

//TODO tests
