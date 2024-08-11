import ContentPage from "@/components/ContentPage";
import { searchById } from "@/services/search.services";
import type { Series } from "@server-models/series.model";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/series/$id")({
  component: Series,
  loader: async ({ params }) => await searchById(params.id, "tv"),
});

function Series() {
  const data = Route.useLoaderData();

  return <ContentPage item={data as Series} />;
}
