import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { MovieSearch } from "@server-models/movie.model";
import type { SeriesSearch } from "@server-models/series.model";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface MovieCardProps {
  item: MovieSearch | SeriesSearch;
}

export default function SearchItemCard({ item }: MovieCardProps) {
  const [loading, setLoading] = useState<boolean>(true);

  // Check if the item is a Series or a Movie
  const isSeries = item.media_type === "tv";

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  // Determine the title and other properties based on the type
  const title = isSeries
      ? (item as SeriesSearch).name
      : (item as MovieSearch).title,
    releaseDate = isSeries
      ? (item as SeriesSearch).first_air_date
      : (item as MovieSearch).release_date;

  return (
    <Card className="select-none">
      <CardHeader className="p-2 sm:p-4">
        {loading && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={posterUrl}
          alt="poster"
          loading="eager"
          className={cn(loading && "h-0 w-0")}
          onLoad={() => setLoading(false)}
        />
        <CardTitle className="font-Anton text-sm sm:text-2xl sm:pt-1">
          {title.toUpperCase()}
        </CardTitle>
        <CardDescription className="max-sm:text-xs">
          [ {releaseDate.split("-")[0]} ]
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
