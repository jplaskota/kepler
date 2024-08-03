import _ from "lodash";
import { movieSchema, type Movie } from "../models/movie.model";
import {
  searchByIdSchema,
  type Series,
  type SeriesIdSearchSchema,
} from "../models/series.model";
import { seriesSchema } from "./../models/series.model";

export const getFormattedContent = (
  json: any,
  type: "movie" | "tv" | undefined
): Movie | Series => {
  if (!json) throw new Error("No data");

  if (type === "movie" || json.media_type === "movie") {
    const data = _.pick(json, Object.keys(movieSchema.shape)) as Movie;

    data.id = data.id.toString();
    data.genres = _.map(data.genres, "name");
    if (type) data.media_type = type;

    return data as Movie;
  }

  if (type === "tv" || json.media_type === "tv") {
    const data = _.pick(
      json,
      Object.keys(searchByIdSchema.shape)
    ) as SeriesIdSearchSchema;

    const newData: Series = {
      id: data.id,
      name: data.name,
      first_air_date: data.first_air_date,
      overview: data.overview,
      popularity: data.popularity,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      genres: data.genres.map((genre) => genre.name),
      created_by: data.created_by.map((creator) => creator.name),
      seasons: data.seasons,
    };

    if (newData.seasons) {
      _.remove(newData.seasons, (s) => s.air_date === null);
      _.remove(newData.seasons, (s) => s.name === "Specials");
    }

    return newData;
  }

  throw new Error("Invalid type");
};
