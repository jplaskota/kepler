import ContentPage from "@/components/ContentPage";
import { getContentById } from "@/services/content.services";
import { Movie } from "@server-models/movie.model";
import { Series } from "@server-models/series.model";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bookmarks/$id")({
  component: Bookmark,
  loader: async ({ params }) => await getContentById(params.id),
});

function Bookmark() {
  const data = Route.useLoaderData();

  return <ContentPage item={data as Movie | Series} />;
}
