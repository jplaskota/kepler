import { createFileRoute } from "@tanstack/react-router";
import ContentList from "../components/ContentList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <ContentList />;
}
