import MoviePage from "@/components/MoviePage";
import SeriesPage from "@/components/SeriesPage";
import { getMovieById } from "@/services/movie.services";
import { getSeriesById } from "@/services/series.services";
import { TMovie } from "@server-models/movie.model";
import { TSeries } from "@server-models/series.model";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/library/$type/$id")({
  component: LibraryItem,
  loader: async ({ params }) => {
    const { type, id } = params;
    if (type === "movie") {
      return await getMovieById(id);
    }
    return await getSeriesById(id);
  },
});

function LibraryItem() {
  const { type } = Route.useParams();
  const data = Route.useLoaderData();

  if (type === "movie") {
    return <MoviePage movie={data as TMovie} />;
  }
  return <SeriesPage series={data as TSeries} />;
}
