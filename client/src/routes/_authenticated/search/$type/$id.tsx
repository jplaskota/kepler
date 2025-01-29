import MoviePage from "@/components/MoviePage";
import SeriesPage from "@/components/SeriesPage";
import { searchMovieById, searchSeriesById } from "@/services/search.services";
import { TMovieSearch } from "@server-models/movie.model";
import { TSeriesSearch } from "@server-models/series.model";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/search/$type/$id")({
  component: SearchItem,
  loader: async ({ params }) => {
    const { type, id } = params;
    if (type === "movie") {
      return await searchMovieById(id);
    }
    return await searchSeriesById(id);
  },
});

function SearchItem() {
  const { type } = Route.useParams();
  const data = Route.useLoaderData();

  if (type === "movie") {
    return <MoviePage movie={data as TMovieSearch} />;
  }
  return <SeriesPage series={data as TSeriesSearch} />;
}
