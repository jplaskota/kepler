import type {
  TMovie,
  TMovieCard,
  TMovieSearch,
} from "@server-models/movie.model";
import { movie } from "./api.services";

export const getMovies = async () => {
  const results = await movie
    .$get()
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch Movie");
      return res;
    })
    .then((res) => res.json());

  return results as TMovieCard[];
};

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

  return results as TMovie;
};

export const postMovie = async (data: TMovieSearch, userId: string) => {
  const results = await movie
    .$post({
      json: {
        ...data,
        user_id: userId,
        media_type: "movie",
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
