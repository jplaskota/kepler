import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import contentRouter from "./routes/content.router";
import movieRouter from "./routes/movie.router";
import searchRouter from "./routes/search.router";
import seriesRouter from "./routes/series.router";

const app = new Hono();
app.use("/api/*", logger());

app.use("*", serveStatic({ root: "../client/dist" }));
app.get("*", serveStatic({ path: "../client/dist/index.html" }));

app.route("/api/content", contentRouter);
app.route("/api/movie", movieRouter);
app.route("/api/series", seriesRouter);
app.route("/api/search", searchRouter);

app.notFound((c) => c.text("Not found ", 404));

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err.message, 500);
});

export default app;

//TODO better error handling
