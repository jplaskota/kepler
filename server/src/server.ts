import { Hono } from "hono";
import { logger } from "hono/logger";
import contentRouter from "./routes/content.router";
import searchRouter from "./routes/tmdb.router";

const app = new Hono();
app.use("*", logger());

app.get("/test", (c) => c.text("Hello Test!"));

app.route("/api/content", contentRouter);
app.route("/api/search", searchRouter);

export default app;
