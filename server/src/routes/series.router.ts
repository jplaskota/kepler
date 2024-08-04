import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { idSchema } from "../models/crud.model";
import { type Series, seriesSchema } from "../models/series.model";
import { fakeSeries } from "../services/fakeContent";
import { getFormattedSeries } from "../utils/getFormattedContent";

const postSeriesSchema = seriesSchema
  .omit({
    tmdb_id: true,
    added_date: true,
  })
  .extend({
    id: z.string().min(1, { message: "id is required" }),
  });

const router = new Hono()
  .get("/", (c) => {
    return c.json(fakeSeries);
  })
  .get("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");
    const content = fakeSeries.find((content) => content.id === id) as Series;

    if (!content) return c.notFound();

    return c.json(content);
  })
  .post("/", zValidator("json", postSeriesSchema), (c) => {
    const series = c.req.valid("json");

    const newSeries: Series = getFormattedSeries(series);

    const parsedContent = seriesSchema.parse(newSeries);
    if (!parsedContent) return c.json({ error: "Invalid content" }, 400);

    fakeSeries.push(newSeries);

    return c.json(newSeries, 201);
  })
  .delete("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id") as string;
    const index = fakeSeries.findIndex(
      (content) => content.id === id
    ) as number;

    if (index === -1) return c.notFound();

    const deletedContent = fakeSeries.splice(index, 1)[0];
    return c.json({
      deleted_content: deletedContent,
    });
  });

export default router;

//TODO tests
//TODO full json data fetch inside or outside post request ?
