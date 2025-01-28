import { createFileRoute } from "@tanstack/react-router";
import Library from "../../components/Library";

export const Route = createFileRoute("/_authenticated/")({
  component: Library,
});
