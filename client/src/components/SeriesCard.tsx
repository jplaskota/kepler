import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Series } from "@server-models/series.model";

interface SeriesCardProps {
  item: Series;
}

export default function SeriesCard({ item }: SeriesCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <Card className="mb-4 sm:w-[300px] select-none">
      <CardHeader className="p-4 max-sm:p-3">
        <img src={posterUrl} alt="poster" />
        <CardTitle className="font-Anton text-2xl sm:text-4xl sm:pt-1">
          {item.name.toUpperCase()}
        </CardTitle>
        <div className="flex gap-1 max-sm:text-xs">
          <CardDescription className="max-sm:text-xs">
            [ {item.first_air_date.split("-")[0]} ]
          </CardDescription>
          <CardDescription className="max-sm:text-xs">
            [ {item.number_of_seasons.toString()} seasons ]
          </CardDescription>
        </div>
        <CardDescription className="max-sm:text-xs">
          {item.genres.join(", ")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

// TODO series page with more info
