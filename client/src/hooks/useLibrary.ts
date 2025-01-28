import { getMovies } from "@/services/movie.services";
import { getSeries } from "@/services/series.services";
import type { TMovieCard } from "@server-models/movie.model";
import type { TSeriesCard } from "@server-models/series.model";
import { useQueries } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { LibraryContext } from "../store/library.context";

type LibraryItem = (TMovieCard | TSeriesCard) & {
  media_type: "movie" | "tv";
  added_date: Date;
  popularity: number;
};

export function useLibrary() {
  const { category, sortBy } = useContext(LibraryContext);

  const [moviesQuery, seriesQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-movies"],
        queryFn: getMovies,
        staleTime: 1000 * 60 * 10,
      },
      {
        queryKey: ["get-series"],
        queryFn: getSeries,
        staleTime: 1000 * 60 * 10,
      },
    ],
  });

  const isLoading = moviesQuery.isLoading || seriesQuery.isLoading;
  const isError = moviesQuery.isError || seriesQuery.isError;

  const library = useMemo(() => {
    const items: LibraryItem[] = [];

    if (moviesQuery.data) {
      items.push(
        ...moviesQuery.data.map((movie) => ({
          ...movie,
        }))
      );
    }

    if (seriesQuery.data) {
      items.push(
        ...seriesQuery.data.map((series) => ({
            ...series,
        }))
      );
    }

    // Filter by category
    const filteredItems =
      category === "all"
        ? items
        : items.filter((item) => item.media_type === category);

    // Sort items
    return filteredItems.sort((a, b) => {
      if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      }
      return b.added_date.getTime() - a.added_date.getTime();
    });
  }, [moviesQuery.data, seriesQuery.data, category, sortBy]);

  return {
    library,
    isLoading,
    isError,
  };
}
