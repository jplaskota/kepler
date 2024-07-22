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

    data.id = data.id.toString();
    data.genres = _.map(data.genres, "name");
    data.media_type = type;

    return data as Movie;
  }

  if (type === "tv") {
    const data = _.pick(json, Object.keys(seriesSchema.shape)) as Series;

    data.id = data.id.toString();
    data.genres = _.map(data.genres, "name");
    data.created_by = _.map(data.created_by, "name");
    data.media_type = type;

    _.remove(data.seasons, (s) => s.air_date === null);
    _.remove(data.seasons, (s) => s.name === "Specials");

    data.number_of_seasons = data.seasons.length;

    return data as Series;
  }

  throw new Error("Invalid type");
};
