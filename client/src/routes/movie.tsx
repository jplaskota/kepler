import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movie")({
  component: () => <div>Hello /movie!</div>,
});
