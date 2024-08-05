import { pick, remove } from "lodash";
import { nanoid } from "nanoid";
import {
  movieRawSchema,
  movieSearchSchema,
  type Movie,
  type MovieRaw,
  type MovieSearch,
} from "../models/movie.model";
import {
  seriesRawSchema,
  seriesSearchSchema,
  type Series,
  type SeriesRaw,
  type SeriesSearch,
} from "../models/series.model";

// Movie functions

export const getSearchMovie = (json: any): MovieSearch => {
  if (!json) throw new Error("No data");

  const data = pick(json, Object.keys(movieSearchSchema.shape)) as MovieSearch;

  return data;
};

export const getFormattedMovie = (json: any): Movie => {
  if (!json) throw new Error("No data");

  const movie = pick(json, Object.keys(movieRawSchema.shape)) as MovieRaw;

  remove(movie.genres, (genre) => genre.name === "" || genre.name === null);

  const newMovie: Movie = {
    ...movie,
    id: nanoid(),
    tmdb_id: movie.id,
    genres: movie.genres.map((genre) => genre.name),
    media_type: "movie",
    added_date: Date.now(),
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

  return data;
};

export const getFormattedSeries = (json: any): Series => {
  if (!json) throw new Error("No data");

  const series = pick(json, Object.keys(seriesRawSchema.shape)) as SeriesRaw;

  remove(
    series.seasons,
    (season) => season.name === "Specials" || season.air_date === null
  );

  const newSeries: Series = {
    ...series,
    id: nanoid(),
    tmdb_id: series.id,
    number_of_episodes: series.seasons.reduce(
      (acc, season) => acc + season.episode_count,
      0
    ),
    number_of_seasons: series.seasons.length,
    genres: series.genres.map((genre) => genre.name),
    created_by: series.created_by.map((creator) => creator.name),
    media_type: "tv",
    added_date: Date.now(),
  };

  return newSeries;
};

// TODO new seasons with null air_date ?
