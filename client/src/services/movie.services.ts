import { type MovieView } from "@server-models/movie.model";
import { omit } from "lodash";
import { movie } from "./api.services";

export const getMovieById = async (id: string) => {
  const results = await movie.id[":id"]
    .$get({
      param: { id },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch Movie by id");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const postMovie = async (data: MovieView, userId: string) => {
  console.log(data.id.toString());
  const results = await movie
    .$post({
      json: {
        ...omit(data, ["id"]),
        tmdb_id: data.id.toString(),
        vote_average: data.vote_average.toString(),
        popularity: data.popularity.toString(),
        user_id: userId,
      },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to post Movie");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const deleteMovieById = async (id: string) => {
  const results = await movie.id[":id"]
    .$delete({
      param: { id },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete Movie by id");
      return res;
    })
    .then((res) => res.json());

  return results;
};

// TODO test post movie
