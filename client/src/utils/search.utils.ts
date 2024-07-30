import { search } from "./api.utils";

export const searchByName = async (title: string) => {
  const results = await search.title[":title"]
    .$get({
      param: { title },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to search by name");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const searchById = async (id: string, type: "movie" | "tv") => {
  const results = await search.id[":id{[0-9]+}"]
    .$get({
      param: { id },
      query: { type },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to search by id");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const searchMovieByName = async (title: string) => {
  const results = await search.movie.title[":title"]
    .$get({
      param: { title },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to search movie by name");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const searchSeriesByName = async (title: string) => {
  const results = await search.series.title[":title"]
    .$get({
      param: { title },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to search series by name");
      return res;
    })
    .then((res) => res.json());

  return results;
};
