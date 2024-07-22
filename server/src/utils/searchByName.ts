import _ from "lodash";
import { fakeMovies, fakeSeries } from "../fakeContent";
import { type Movie } from "../models/movie.model";
import { type Series } from "../models/series.model";

export const searchByName = (name: string): (Movie | Series)[] => {
  const allContent: (Movie | Series)[] = [
    ...(_.filter(fakeMovies, (c) =>
      c.title.toLowerCase().includes(name.toLowerCase())
    ) as Movie[]),
    ...(_.filter(fakeSeries, (c) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    ) as Series[]),
  ];

  return allContent;
};
