import type { ApiRoutes } from "@server-api";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const search = client.api.search,
  movie = client.api.movie,
  series = client.api.series,
  auth = client.api,
  additional = client.api.additional;
