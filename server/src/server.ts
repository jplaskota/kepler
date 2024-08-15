import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth.route";
import { contentRoute } from "./routes/content.route";
import { movieRoute } from "./routes/movie.route";
import { searchRoute } from "./routes/search.route";
import { seriesRoute } from "./routes/series.route";

const app = new Hono();
app.use("/api/*", logger());

app.use("*", serveStatic({ root: "../client/dist" }));
app.get("*", serveStatic({ path: "../client/dist/index.html" }));

const apiRoutes = app
  .basePath("/api")
  .route("/content", contentRoute)
  .route("/movie", movieRoute)
  .route("/series", seriesRoute)
  .route("/search", searchRoute)
  .route("/", authRoute);

app.notFound((c) => c.text("Not found", 404));

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err.message, 500);
});

export default app;
export type ApiRoutes = typeof apiRoutes;

//TODO better error handling
