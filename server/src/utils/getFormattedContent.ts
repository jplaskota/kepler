import { pick, remove } from "lodash";
import {
  movieRawSchema,
  movieSearchSchema,
  type MovieRaw,
  type MovieSearch,
  type MovieView,
} from "../models/movie.model";
import {
  seriesRawSchema,
  seriesSearchSchema,
  type SeriesRaw,
  type SeriesSearch,
  type SeriesView,
} from "../models/series.model";

// Movie functions

export const getSearchMovie = (json: any): MovieSearch => {
  if (!json) throw new Error("No data");

  const data = pick(json, Object.keys(movieSearchSchema.shape)) as MovieSearch;
  data.media_type = "movie";

  return data;
};

export const getFormattedMovie = (json: any): MovieView => {
  if (!json) throw new Error("No data");

  const movie = pick(json, Object.keys(movieRawSchema.shape)) as MovieRaw;

  remove(movie.genres, (genre) => genre.name === "" || genre.name === null);

  const newMovie: MovieView = {
    ...movie,
    genres: movie.genres.map((genre) => genre.name),
    media_type: "movie",
  };

  return newMovie;
};

// Series functions

export const getSearchSeries = (json: any): SeriesSearch => {
  if (!json) throw new Error("No data");

  const data = pick(
    json,
    Object.keys(seriesSearchSchema.shape)
  ) as SeriesSearch;

  data.media_type = "tv";

  return data;
};

export const getFormattedSeries = (json: any): SeriesView => {
  if (!json) throw new Error("No data");

  const series = pick(json, Object.keys(seriesRawSchema.shape)) as SeriesRaw;

  remove(
    series.seasons,
    (season) => season.name === "Specials" || season.air_date === null
  );
  remove(series.genres, (genre) => genre.name === "" || genre.name === null);

  const newSeries: SeriesView = {
    ...series,
    title: series.name,
    number_of_episodes: series.seasons.reduce(
      (acc, season) => acc + season.episode_count,
      0
    ),
    number_of_seasons: series.seasons.length,
    genres: series.genres.map((genre) => genre.name),
    created_by: series.created_by.map((creator) => creator.name),
    media_type: "tv",
  };

  return newSeries;
};

// TODO new seasons with null air_date ?
