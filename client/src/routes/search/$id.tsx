import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/$id")({
  component: () => <div>Hello /search/$id!</div>,
});
