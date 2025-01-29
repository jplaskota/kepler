import { TActor, TSeason } from "@server-models/series.model";

export interface TFormattedMovie {
  title: string;
  year: string;
  credits: string;
  details: string;
  vote_average: string;
  poster_path: string | null;
  overview: string;
  genres: string[];
  actors: TActor[];
}

export interface TFormattedSeries extends TFormattedMovie {
  seasons: TSeason[];
}
