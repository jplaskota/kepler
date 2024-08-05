import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SeriesSearch } from "@server-models/series.model";

interface SeriesCardProps {
  item: SeriesSearch;
  search?: boolean;
}

export default function SearchSeriesCard({ item }: SeriesCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <Card className="select-none">
      <CardHeader className="p-2 sm:p-4">
        <img src={posterUrl} alt={`${item.name} poster`} />
        <CardTitle className="font-Anton text-sm sm:text-2xl sm:pt-1">
          {item.name.toUpperCase()}
        </CardTitle>
        <CardDescription className="max-sm:text-xs">
          [ {item.first_air_date.split("-")[0]} ]
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

// TODO series page with more info
