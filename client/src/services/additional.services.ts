import { additional } from "./api.services";

export const getActors = async (id: string, media: string) => {
  const results = await additional.actors[":id"]
    .$get({
      param: { id },
      query: {
        type: media,
      },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch Movie");
      return res;
    })
    .then((res) => res.json());
  return results;
};
