import {
  searchMoviesByName,
  searchSeriesByName,
} from "@/services/search.services";
import type { TMovieSearchCard } from "@server-models/movie.model";
import type { TSeriesSearchCard } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useSearch() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<TMovieSearchCard[]>([]);
  const [series, setSeries] = useState<TSeriesSearchCard[]>([]);
  const [searchStatus, setSearchStatus] = useState<boolean>(true);

  const moviesQuery = useQuery<TMovieSearchCard[]>({
    queryKey: ["search-movies", searchValue],
    queryFn: () => searchMoviesByName(searchValue),
    enabled: searchValue.length > 0,
  });

  const seriesQuery = useQuery<TSeriesSearchCard[]>({
    queryKey: ["search-series", searchValue],
    queryFn: () => searchSeriesByName(searchValue),
    enabled: searchValue.length > 0,
  });

  useEffect(() => {
    if (moviesQuery.data) {
      setMovies(moviesQuery.data);
      setSearchStatus(moviesQuery.data.length > 0);
    }
  }, [moviesQuery.data]);

  useEffect(() => {
    if (seriesQuery.data) {
      setSeries(seriesQuery.data);
      setSearchStatus(seriesQuery.data.length > 0);
    }
  }, [seriesQuery.data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = useCallback(
    debounce((value: string) => {
      setSearchValue(value.trim());
    }, 500),
    []
  );

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
    handleInputChange(event.target.value);
  };

  useEffect(() => {
    if (moviesQuery.isError) toast.error("Error while fetching movies");
    if (seriesQuery.isError) toast.error("Error while fetching series");
  }, [moviesQuery.isError, seriesQuery.isError]);

  return {
    inputValue,
    movies,
    series,
    searchStatus,
    isLoading: moviesQuery.isLoading || seriesQuery.isLoading,
    handleInputValueChange,
  };
}
