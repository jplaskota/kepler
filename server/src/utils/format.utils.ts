import _ from "lodash";
import { movieSchema, type Movie } from "../models/movie.model";
import { seriesSchema, type Series } from "../models/series.model";

export const format = (json: unknown, type: "movie" | "tv"): Movie | Series => {
  if (!json) throw new Error("No data");

  if (type === "movie") {
    const data = _.pick(json, Object.keys(movieSchema.shape)) as Movie;

    const genres = data.genres.map((genre: any) => genre.name);
    data.genres = genres;
    data.media_type = type;

    return data;
  }

  if (type === "tv") {
    const data = _.pick(json, Object.keys(seriesSchema.shape)) as Series;

    const genres = data.genres.map((genre: any) => genre.name);
    data.genres = genres;
    data.media_type = type;

    return data;
  }

  throw new Error("Invalid type");
};
