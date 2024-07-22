import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { omit } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { fakeSeries } from "../fakeContent";
import { type Series, seriesSchema } from "../models/series.model";

const postSeriesSchema = seriesSchema.omit({ tmdb_id: true });

const router = new Hono()
  .get("/", (c) => {
    return c.json(fakeSeries);
  })
  .get("/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");
    const content = fakeSeries.find((content) => content.id === id);

    if (!content) {
      return c.notFound();
    }

    return c.json(content);
  })
  .post("/", zValidator("json", postSeriesSchema), (c) => {
    const content = c.req.valid("json");

    const newContent: Series = {
      id: uuidv4(),
      tmdb_id: content.id,
      ...omit(content, "id"),
    };

    fakeSeries.push(newContent);

    c.status(201);
    return c.json(newContent);
  })
  .delete("/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");
    const index = fakeSeries.findIndex((content) => content.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedContent = fakeSeries.splice(index, 1)[0];
    return c.json({ content: deletedContent });
  });

export default router;

//TODO tests
