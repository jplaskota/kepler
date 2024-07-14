import { Hono } from "hono";
import { logger } from "hono/logger";
import movieRouter from "./routes/movie.router";
import searchRouter from "./routes/tmdb.router";

const app = new Hono();
app.use("*", logger());

app.get("/api/test", (c) => c.text("Hello Test!"));

app.route("/api/content", movieRouter);
app.route("/api/search", searchRouter);

app.notFound((c) => c.json({ message: "Not Found" }, 404));

export default app;

// TODO routes for movies and series crud
