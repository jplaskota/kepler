import _ from "lodash";
import { movieSchema, type Movie } from "../models/movie.model";
import { seriesSchema, type Series } from "../models/series.model";

export const getFormattedContent = (
  json: unknown,
  type: "movie" | "tv"
): Movie | Series => {
  if (!json) throw new Error("No data");

  if (type === "movie") {
    const data = _.pick(json, Object.keys(movieSchema.shape)) as Movie;

    data.genres = _.map(data.genres, "name");
    data.media_type = type;

    return data;
  }

  if (type === "tv") {
    const data = _.pick(json, Object.keys(seriesSchema.shape)) as Series;

    data.genres = _.map(data.genres, "name");
    data.media_type = type;

    _.remove(data.seasons, (s) => s.air_date === null);

    return data;
  }

  throw new Error("Invalid type");
};
