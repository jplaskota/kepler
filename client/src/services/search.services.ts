import { search } from "./api.services";

export const searchMoviesByName = async (title: string) => {
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

export const searchMovieById = async (id: string) => {
  const results = await search.movie.id[":id"]
    .$get({
      param: { id },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to search movie by id");
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

export const searchSeriesById = async (id: string) => {
  const results = await search.series.id[":id"]
    .$get({
      param: { id },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to search series by id");
      return res;
    })
    .then((res) => res.json());

  return results;
};
