import { type Series } from "@server-models/series.model";
import { series } from "./api.services";

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
      json: {
        ...data,
        id: data.id.toString(),
        vote_average: data.vote_average.toString(),
        popularity: data.popularity.toString(),
        seasons: data.seasons.map((season) => ({
          ...season,
          vote_average: season.vote_average.toString(),
        })),
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
