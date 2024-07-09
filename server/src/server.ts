import { Hono } from "hono";
import { logger } from "hono/logger";
import { contentRoutes } from "./routes/content.routes";

const app = new Hono();
app.use("*", logger());

app.get("/test", (c) => c.text("Hello Test!"));

app.route("/api/content", contentRoutes);

export default app;
