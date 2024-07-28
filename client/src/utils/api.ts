import { type ApiRoutes } from "@server-api";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client.api;

// TODO ? export crud