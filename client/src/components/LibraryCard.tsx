import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { TMovieCard } from "@server-models/movie.model";
import type { TSeriesCard } from "@server-models/series.model";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface LibraryCardProps {
  item: TMovieCard | TSeriesCard;
}

export default function LibraryCard({ item }: LibraryCardProps) {
  const [loading, setLoading] = useState<boolean>(true);

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  // Get library info based on type
  const title =
    item.media_type === "tv"
      ? (item as TSeriesCard).name
      : (item as TMovieCard).title;
  const releaseDate =
    item.media_type === "tv"
      ? (item as TSeriesCard).first_air_date
      : (item as TMovieCard).release_date;
  const additionalInfo =
    item.media_type === "tv"
      ? `${(item as TSeriesCard).number_of_seasons} seasons`
      : `${(item as TMovieCard).runtime} mins`;

  return (
    <Link
      to="/library/$type/$id"
      params={{
        type: item.media_type,
        id: item._id,
      }}
    >
      <Card className="mb-4">
        <CardHeader className="p-2 sm:p-3">
          {loading && <Skeleton className="aspect-[8/12] w-full" />}
          <img
            src={posterUrl}
            alt="poster"
            loading="lazy"
            className={cn(loading && "h-0 w-0", "w-full rounded-md")}
            onLoad={() => setLoading(false)}
            crossOrigin="anonymous"
          />
          <CardTitle className="font-Anton text-2xl sm:text-4xl sm:pt-1 truncate">
            {title.toUpperCase()}
          </CardTitle>
          <div className="flex gap-1 max-sm:text-xs">
            <CardDescription className="max-sm:text-xs">
              [ {releaseDate.split("-")[0]} ]
            </CardDescription>
            <CardDescription className="max-sm:text-xs">
              [ {additionalInfo} ]
            </CardDescription>
            <CardDescription className="max-sm:text-xs">
              [ {item.vote_average} ]
            </CardDescription>
          </div>
          <CardDescription className="max-sm:text-xs truncate">
            [ {item.genres.join(" ] [ ")} ]
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

// TODO series page with more info
// TODO one line category
// TODO text truncation
