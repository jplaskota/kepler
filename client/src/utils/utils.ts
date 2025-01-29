import { TFormattedMovie, TFormattedSeries } from "@/types/media.types";
import { TMovie, TMovieSearch } from "@server-models/movie.model";
import { TSeries, TSeriesSearch } from "@server-models/series.model";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMovie(movie: TMovie | TMovieSearch) {
  const newMovie: TFormattedMovie = {
    title: movie.title,
    year: movie.release_date.split("-")[0],
    credits: movie.director,
    details: movie.runtime + " min",
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    overview: movie.overview,
    genres: movie.genres,
    actors: movie.actors,
  };

  return newMovie;
}

export function formatSeries(series: TSeries | TSeriesSearch) {
  const newSeries: TFormattedSeries = {
    title: series.name,
    year: series.first_air_date.split("-")[0],
    credits: series.created_by.join(", "),
    details: series.number_of_seasons + " seasons",
    vote_average: series.vote_average,
    poster_path: series.poster_path,
    overview: series.overview,
    genres: series.genres,
    actors: series.actors,
    seasons: series.seasons,
  };

  return newSeries;
}
