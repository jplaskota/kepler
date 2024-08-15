import { type MovieView } from "@server-models/movie.model";
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

export const postMovie = async (data: MovieView) => {
  const results = await movie
    .$post({
      json: {
        ...data,
        id: data.id.toString(),
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

// TODO id is number, not string ???
