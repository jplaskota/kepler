import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MovieSearch } from "@server-models/movie.model";

interface MovieCardProps {
  item: MovieSearch;
  search?: boolean;
}

export default function MovieCard({ item }: MovieCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <Card className="select-none">
      <CardHeader className="p-2 sm:p-4 ">
        <img src={posterUrl} alt="poster" />
        <CardTitle className="font-Anton text-sm sm:text-2xl sm:pt-1">
          {item.title.toUpperCase()}
        </CardTitle>
        <CardDescription className="max-sm:text-xs">
          [ {item && item.release_date.split("-")[0]} ]
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

// TODO movie page with more info
