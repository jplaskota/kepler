import { TFormattedMovie, TFormattedSeries } from "@/types/media.types";
import type { TActors } from "@server-models/additional.model";
import { TMovie, TMovieSearch } from "@server-models/movie.model";
import type { TSeason } from "@server-models/series.model";
import { TSeries, TSeriesSearch } from "@server-models/series.model";
import { clsx, type ClassValue } from "clsx";
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
    seasons: series.seasons,
  };

  return newSeries;
}

export function actorsToSliderItems(actors: TActors) {
  return actors.map((actor) => ({
    id: actor.id,
    title: actor.character,
    subtitle: actor.original_name,
    image_path: actor.profile_path,
  }));
}

export function seasonsToSliderItems(seasons: TSeason) {
  return seasons.map((season) => ({
    id: season.id,
    title: "Season - " + season.season_number,
    subtitle: "Episodes - " + season.episode_count.toString(),
    image_path: season.poster_path,
  }));
}

export function contentToSliderItems(
  content: Array<{
    name?: string;
    title?: string;
    popularity: string;
    poster_path?: string | null;
    first_air_date?: string;
    release_date?: string;
    vote_average: string;
    tmdb_id: number;
    media_type: "tv" | "movie";
    genres: string[];
  }>
) {
  return content.map((item) => ({
    id: item.tmdb_id,
    title: item.media_type === "tv" ? item.name! : item.title!,
    subtitle: `[ ${item.media_type === "tv" ? item.first_air_date?.split("-")[0] : item.release_date?.split("-")[0]} ]`,
    image_path: item.poster_path || null,
  }));
}
