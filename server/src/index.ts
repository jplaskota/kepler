import app from "./server";

const port = Bun.env.PORT;

Bun.serve({
  port: port,
  fetch: app.fetch,
});

console.log("Server running on port: " + port);
