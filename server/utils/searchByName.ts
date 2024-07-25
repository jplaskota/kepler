import _ from "lodash";
import { type Movie } from "../models/movie.model";
import { type Series } from "../models/series.model";
import { fakeMovies, fakeSeries } from "../services/fakeContent";

export const searchByName = (name: string): (Movie | Series)[] => {
  const allContent: (Movie | Series)[] = [
    ...(_.filter(fakeMovies, (c: Movie) =>
      c.title.toLowerCase().includes(name.toLowerCase())
    ) as Movie[]),
    ...(_.filter(fakeSeries, (c: Series) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    ) as Series[]),
  ];

  return allContent;
};
