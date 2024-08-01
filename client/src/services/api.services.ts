import { type ApiRoutes } from "@server-api";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const content = client.api.content;
export const search = client.api.search;
export const movie = client.api.movie;
export const series = client.api.series;
