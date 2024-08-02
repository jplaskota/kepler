import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Movie } from "@server-models/movie.model";

interface MovieCardProps {
  item: Movie;
}

export default function MovieCard({ item }: MovieCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <Card className="mb-4 sm:w-[300px] select-none">
      <CardHeader className="p-3 sm:p-4 ">
        <img src={posterUrl} alt="poster" />
        <CardTitle className="font-Anton text-2xl sm:text-4xl sm:pt-1">
          {item.title.toUpperCase()}
        </CardTitle>
          <div className="flex gap-1 max-sm:text-xs">
            <CardDescription className="max-sm:text-xs">
              [ {item && item.release_date.split("-")[0]} ]
            </CardDescription>
            <CardDescription className="max-sm:text-xs">
              [ {item.runtime} min ]
            </CardDescription>
          </div>
          <CardDescription className="max-sm:text-xs text-balance">
            {item.genres.join(", ")}
          </CardDescription>
      </CardHeader>
    </Card>
  );
}

// TODO movie page with more info
