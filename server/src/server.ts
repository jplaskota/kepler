import { Hono } from "hono";
import { logger } from "hono/logger";
import contentRouter from "./routes/content.router";
import movieRouter from "./routes/movie.router";
import searchRouter from "./routes/search.router";
import seriesRouter from "./routes/series.router";

const app = new Hono().basePath("/api");
app.use("*", logger());

app.get("/", (c) => c.json({ message: "Hello API!" }));

app.route("/content", contentRouter);
app.route("/movie", movieRouter);
app.route("/series", seriesRouter);
app.route("/search", searchRouter);

app.notFound((c) => c.json({ message: "Not Found" }, 404));

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err.message, 500);
});

export default app;
