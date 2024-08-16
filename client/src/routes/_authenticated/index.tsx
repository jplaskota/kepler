import { createFileRoute } from "@tanstack/react-router";
import ContentList from "../../components/ContentList";

export const Route = createFileRoute("/_authenticated/")({
  component: ContentList,
});
