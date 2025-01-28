// import type { TSeries } from "@server-models/series.model";
import { TSeriesCard, TSeriesSearch } from "@server-models/series.model";
import { series } from "./api.services";

export const getSeries = async () => {
  const results = await series
    .$get()
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch Series");
      return res;
    })
    .then((res) => res.json());

  return results as TSeriesCard[];
};

export const getSeriesById = async (id: string) => {
  const results = await series.id[":id"]
    .$get({
      param: { id },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch Series by id");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const postSeries = async (data: TSeriesSearch, userId: string) => {
  const results = await series
    .$post({
      json: {
        ...data,
        poster_path: data.poster_path ?? null,
        user_id: userId,
        media_type: "tv",
      },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to post Series");
      return res;
    })
    .then((res) => res.json());

  return results;
};

export const deleteSeriesById = async (id: string) => {
  const results = await series.id[":id"]
    .$delete({
      param: { id },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete Series by id");
      return res;
    })
    .then((res) => res.json());

  return results;
};

// TODO id is number, not string ???
