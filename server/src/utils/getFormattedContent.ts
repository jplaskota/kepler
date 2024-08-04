import { pick } from "lodash";
import { nanoid } from "nanoid";
// import { movieSchema, type Movie } from "../models/movie.model";
import {
  seriesRawSchema,
  seriesSearchSchema,
  type Series,
  type SeriesRaw,
  type SeriesSearch,
} from "../models/series.model";

// TODO movie functions

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
