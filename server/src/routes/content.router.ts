import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { type Movie } from "../models/movie.model";
import { idSchema } from "../models/param.model";
import { type Series } from "../models/series.model";
import { fakeMovies, fakeSeries } from "../services/fakeContent";
import { searchByName } from "../utils/searchByName";

const router = new Hono()
  .get("/", (c) => {
    const allContent: (Movie | Series)[] = [...fakeMovies, ...fakeSeries].sort(
      (a, b) => b.added_date - a.added_date
    );

    return c.json(allContent);
  })
  .get("/id/:id", zValidator("param", idSchema), (c) => {
    const id = c.req.param("id");

    if (fakeMovies.some((c) => c.id === id)) {
      return c.redirect("/api/movie/id/" + id);
    }
    if (fakeSeries.some((c) => c.id === id)) {
      return c.redirect("/api/series/id/" + id);
    }

    return c.notFound();
  })
  .get("/title/:title", (c) => {
    const title = c.req.param("title");
    const content = searchByName(title);

    return c.json(content);
  });

export default router;

//TODO tests
