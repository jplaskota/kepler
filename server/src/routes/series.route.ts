import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getUser } from "../kinde";
import { idSchema } from "../models/crud.model";
import {
  type Series,
  seriesSchema,
  seriesViewSchema,
} from "../models/series.model";
import { fakeSeries } from "../services/fakeContent";
import { getPostSeries } from "../utils/getFormattedContent";

const postSeriesSchema = seriesSchema
  .omit({
    tmdb_id: true,
    added_date: true,
  })
  .extend({
    id: z.string().min(1, { message: "id is required" }),
  });

export const seriesRoute = new Hono()
  .get("/", getUser, (c) => {
    return c.json(fakeSeries);
  })
  .get("/id/:id", getUser, zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");
    const content = fakeSeries.find((content) => content.id === id) as Series;

    if (!content) return c.notFound();

    return c.json(content);
  })
  .post("/", getUser, zValidator("json", seriesViewSchema), (c) => {
    const series = c.req.valid("json");

    if (fakeSeries.some((c) => c.tmdb_id === series.id))
      return c.text("Already exists", 409);

    const newSeries: Series = getPostSeries(series);

    const parsedContent = seriesSchema.parse(newSeries);
    if (!parsedContent) return c.json({ error: "Invalid content" }, 400);

    fakeSeries.push(newSeries);

    return c.json(newSeries, 201);
  })
  .delete("/id/:id", getUser, zValidator("param", idSchema), (c) => {
    const id = c.req.param("id") as string;
    const index = fakeSeries.findIndex(
      (content) => content.id === id
    ) as number;

    if (index === -1) return c.notFound();

    const deletedContent = fakeSeries.splice(index, 1)[0];
    return c.json(deletedContent);
  });

//TODO tests
