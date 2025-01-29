import MoviePage from "@/components/MoviePage";
import SeriesPage from "@/components/SeriesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/search/$type/$id")({
  component: SearchItem,
});

function SearchItem() {
  const { type, id } = Route.useParams();

  if (type === "movie") return <MoviePage id={id} saved={false} />;
  if (type === "tv") return <SeriesPage id={id} saved={false} />;

  return <p>404 Not Found</p>;
}
