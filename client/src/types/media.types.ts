import type { TSeason } from "@server-models/series.model";

export interface TFormattedMovie {
  title: string;
  year: string;
  credits: string;
  details: string;
  vote_average: string;
  poster_path: string | null;
  overview: string;
  genres: string[];
}

export interface TFormattedSeries extends TFormattedMovie {
  seasons: TSeason;
}
