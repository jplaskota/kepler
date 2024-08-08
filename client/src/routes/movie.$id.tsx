import { searchById } from "@/services/search.services";
import type { Movie } from "@server-models/movie.model";
import { createFileRoute } from "@tanstack/react-router";
import MoviePage from "../components/MoviePage";

export const Route = createFileRoute("/movie/$id")({
  component: Movie,
  loader: async ({ params }) => await searchById(params.id, "movie"),
});

function Movie() {
  const data = Route.useLoaderData();

  return <MoviePage item={data as Movie} />;
}
