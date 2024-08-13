import { Movie } from "@server-models/movie.model";
import { Series } from "@server-models/series.model";
import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "../components/ContentPage";
import { getContentById } from "../services/content.services";

export const Route = createFileRoute("/$id")({
  component: Content,
  loader: async ({ params }) => await getContentById(params.id),
});

function Content() {
  const data = Route.useLoaderData();

  return <ContentPage item={data as Movie | Series} />;
}

// TODO del redirect in get/id [server]
