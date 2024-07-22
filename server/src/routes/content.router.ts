import { Hono } from "hono";
import { fakeMovies, fakeSeries } from "../fakeContent";
import { type Movie } from "../models/movie.model";
import { type Series } from "../models/series.model";

const router = new Hono()
  .get("/", (c) => {
    const allContent: (Movie | Series)[] = [...fakeMovies, ...fakeSeries];

    return c.json(allContent);
  })
  .get("/id/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");

    if (fakeMovies.some((c) => c.id === id)) {
      return c.redirect("/api/movie/id/" + id);
    }
    if (fakeSeries.some((c) => c.id === id)) {
      return c.redirect("/api/series/id/" + id);
    }

    return c.notFound();
  })
  .get("/name/:name{[a-zA-Z0-9-]+}", (c) => {
    //TODO get by name from all
    const name = c.req.param("name");
    return c.text("content name: " + name);
  });

export default router;

//TODO tests
//TODO get all sorted by date
