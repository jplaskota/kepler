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
      setSearchStatus(prev => prev || seriesQuery.data.length > 0);
    }
  }, [seriesQuery.data]);

  const handleInputChange = useCallback(
    debounce((value: string) => {
      setSearchValue(value.trim());
    }, 500),
    []
  );

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setInputValue(value);
    handleInputChange(value);
  };

  useEffect(() => {
    if (moviesQuery.isError || seriesQuery.isError) {
      toast.warning("Something went wrong");
    }
  }, [moviesQuery.isError, seriesQuery.isError]);

  useEffect(() => {
    if (moviesQuery.data && moviesQuery.data.length > 0) {
      setSearchStatus(true);
      setMovies(moviesQuery.data);
    } else if (moviesQuery.data) {
      setSearchStatus(false);
    }

    if (seriesQuery.data && seriesQuery.data.length > 0) {
      setSearchStatus(true);
      setSeries(seriesQuery.data);
    } else if (seriesQuery.data) {
      setSearchStatus(false);
    }
  }, [moviesQuery.data, seriesQuery.data]);

  return {
    inputValue,
    movies,
    series,
    searchStatus,
    isLoading: moviesQuery.isLoading || seriesQuery.isLoading,
    handleInputValueChange,
  };
}
