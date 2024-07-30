import { type Series } from "@server-models/series.model";
import { series } from "./api.utils";

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

export const postSeries = async (data: Series) => {
  const results = await series
    .$post({
      json: data,
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
