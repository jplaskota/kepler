import app from "./server";

const port = Bun.env.PORT || 3000;

Bun.serve({
  port: port,
  fetch: app.fetch,
});

console.log("Server running on port: " + port);
