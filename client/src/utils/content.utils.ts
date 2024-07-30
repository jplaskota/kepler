import { content, movie, series } from "./api.utils";

export const getContent = async (type?: string) => {
  if (type === "movie") {
    const results = await movie
      .$get()
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res;
      })
      .then((res) => res.json());

    return results;
  }

  if (type === "tv") {
    const results = await series
      .$get()
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res;
      })
      .then((res) => res.json());

    return results;
  }

  const results = await content
    .$get()
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const getContentById = async (id: string) => {
  const results = await content.id[":id"]
    .$get({
      param: { id },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const getContentByTitle = async (title: string) => {
  const results = await content.title[":title"]
    .$get({
      param: { title },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res;
    })
    .then((res) => res.json());

  return results;
};
