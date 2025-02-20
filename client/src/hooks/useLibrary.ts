import { getMovies } from "@/services/movie.services";
import { getSeries } from "@/services/series.services";
import { useLibraryContext } from "@/store/library.context";
import type { TMovieCard } from "@server-models/movie.model";
import type { TSeriesCard } from "@server-models/series.model";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

type LibraryItem = (TMovieCard | TSeriesCard) & {
  media_type: "movie" | "tv";
  added_date: Date;
  popularity: string;
};

export function useLibrary() {
  const { category, sortBy } = useLibraryContext();
  const queryClient = useQueryClient();

  const [moviesQuery, seriesQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-movies"],
        queryFn: getMovies,
        staleTime: 1000 * 60 * 10,
        retry: 1,
      },
      {
        queryKey: ["get-series"],
        queryFn: getSeries,
        staleTime: 1000 * 60 * 10,
        retry: 1,
      },
    ],
  });

  const isLoading = moviesQuery.isLoading && seriesQuery.isLoading;
  const isEmpty =
    !isLoading && !moviesQuery.data?.length && !seriesQuery.data?.length;

  const refetchMovies = async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-movies"] });
  };

  const refetchSeries = async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-series"] });
  };

  const refetchLibrary = async () => {
    await Promise.all([refetchMovies(), refetchSeries()]);
  };

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

    // Update cached size after confirming the actual library state
    if (!isLoading) {
      if (items.length > 0) {
        localStorage.setItem("librarySize", items.length.toString());
      } else {
        localStorage.removeItem("librarySize");
      }
    }

    switch (sortBy) {
      case "added_date":
        return [...filteredItems].sort(
          (a, b) =>
            new Date(b.added_date).getTime() - new Date(a.added_date).getTime()
        );
      case "popularity":
        return [...filteredItems].sort(
          (a, b) => Number(b.popularity) - Number(a.popularity)
        );
      case "rating":
        return [...filteredItems].sort(
          (a, b) => Number(b.vote_average) - Number(a.vote_average)
        );
      default:
        return filteredItems;
    }
  }, [moviesQuery.data, seriesQuery.data, category, sortBy, isLoading]);

  // Clear cache if library becomes empty
  useEffect(() => {
    if (isEmpty) {
      localStorage.removeItem("librarySize");
    }
  }, [isEmpty]);

  const cachedSize = parseInt(localStorage.getItem("librarySize") || "0");

  return {
    library,
    isLoading,
    isEmpty,
    refetchMovies,
    refetchSeries,
    refetchLibrary,
    cachedSize,
  };
}
