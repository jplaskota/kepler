import type { TMovieSearchCard } from "@server-models/movie.model";
import type { TSeriesSearchCard } from "@server-models/series.model";

export interface SearchBarProps {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onClose: () => void;
  isLoading: boolean;
}

export interface SearchModalProps {
  onClose: () => void;
}

export interface SearchResultProps {
  moviesList: TMovieSearchCard[];
  seriesList: TSeriesSearchCard[];
  onClose: () => void;
}

export interface SearchItemCardProps {
  item: TMovieSearchCard | TSeriesSearchCard;
  onClose: () => void;
}