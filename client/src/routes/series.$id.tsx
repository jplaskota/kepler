import { searchById } from "@/services/search.services";
import type { Series } from "@server-models/series.model";
import { createFileRoute } from "@tanstack/react-router";
import SeriesPage from "../components/SeriesPage";

export const Route = createFileRoute("/series/$id")({
  component: Series,
  loader: async ({ params }) => await searchById(params.id, "tv"),
});

function Series() {
  const data = Route.useLoaderData();

  return <SeriesPage item={data as Series} />;
}
