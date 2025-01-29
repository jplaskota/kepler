import MoviePage from "@/components/MoviePage";
import SeriesPage from "@/components/SeriesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/library/$type/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { type, id } = Route.useParams();

  if (type === "movie") return <MoviePage id={id} saved={true} />;
  if (type === "tv") return <SeriesPage id={id} saved={true} />;

  return <p>404 Not Found</p>;
}
