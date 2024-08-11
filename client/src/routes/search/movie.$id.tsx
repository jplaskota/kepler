import ContentPage from "@/components/ContentPage";
import { searchById } from "@/services/search.services";
import type { Movie } from "@server-models/movie.model";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/movie/$id")({
  component: Movie,
  loader: async ({ params }) => await searchById(params.id, "movie"),
});

function Movie() {
  const data = Route.useLoaderData();

  return <ContentPage item={data as Movie} />;
}
