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

const apiRoutes = app
  .basePath("/api")
  .route("/content", contentRouter)
  .route("/movie", movieRouter)
  .route("/series", seriesRouter)
  .route("/search", searchRouter);

app.notFound((c) => c.text("Not found", 404));

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err.message, 500);
});

export default app;
export type ApiRoutes = typeof apiRoutes;

//TODO better error handling
