import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { Movie } from "@server-models/movie.model";
import type { Series } from "@server-models/series.model";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface ContentCardProps {
  item: Series | Movie;
}

export default function ContentCard({ item }: ContentCardProps) {
  const [loading, setLoading] = useState<boolean>(true);

  // Check if the item is a Series or a Movie
  const isSeries = item.media_type === "tv";

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  // Determine the title and other properties based on the type
  const title = isSeries ? (item as Series).name : (item as Movie).title;
  const releaseDate = isSeries
    ? (item as Series).first_air_date
    : (item as Movie).release_date;
  const additionalInfo = isSeries
    ? `${(item as Series).number_of_seasons} seasons`
    : `${(item as Movie).runtime} mins`;
  const genres = item.genres.join(", ");

  return (
    <Card className="sm:w-[300px] rounded-xl mb-4 select-none animate-fade-in">
      <CardHeader className="p-2 sm:p-3">
        {loading && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={posterUrl}
          alt="poster"
          loading="lazy"
          className={cn(loading && "h-0 w-0", "w-full rounded-md")}
          onLoad={() => setLoading(false)}
        />
        <CardTitle className="font-Anton text-2xl sm:text-4xl sm:pt-1">
          {title.toUpperCase()}
        </CardTitle>
        <div className="flex gap-1 max-sm:text-xs">
          <CardDescription className="max-sm:text-xs">
            [ {releaseDate.split("-")[0]} ]
          </CardDescription>
          <CardDescription className="max-sm:text-xs">
            [ {additionalInfo} ]
          </CardDescription>
        </div>
        <CardDescription className="max-sm:text-xs">{genres}</CardDescription>
      </CardHeader>
    </Card>
  );
}

// TODO series page with more info
// TODO one line category
// TODO text truncation
