import { createFileRoute } from "@tanstack/react-router";
import ContentList from "../components/ContentList";

export const Route = createFileRoute("/")({
  component: Index,
});

export default function Index() {
  return <ContentList />;
}
