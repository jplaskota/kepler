import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SearchItemCardProps } from "@/types/search.types";
import type { TMovieSearchCard } from "@server-models/movie.model";
import type { TSeriesSearchCard } from "@server-models/series.model";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

// Type guard functions
const isSeriesSearch = (item: TMovieSearchCard | TSeriesSearchCard): item is TSeriesSearchCard => {
  return item.media_type === "tv";
};

export default function SearchItemCard({ item, onClose }: SearchItemCardProps) {
  const [loading, setLoading] = useState<boolean>(true);

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  // Use type guard for safe type narrowing
  const title = isSeriesSearch(item) ? item.name : item.title;
  const releaseDate = isSeriesSearch(item) ? item.first_air_date : item.release_date;

  return (
    <Link
      to="/search/$type/$id"
      params={{
        type: item.media_type,
        id: item.tmdb_id.toString(),
      }}
    >
      <Card
        className="select-none hover:scale-[1.02] transition-transform"
        onClick={onClose}
      >
        <CardHeader className="p-2 sm:p-4">
          {loading && <Skeleton className="aspect-[8/12] w-full" />}
          <img
            src={posterUrl}
            alt={`${title} poster`}
            loading="eager"
            className={cn(loading && "h-0 w-0", "w-full rounded-md")}
            onLoad={() => setLoading(false)}
            crossOrigin="anonymous"
          />
          <CardTitle className="font-Anton text-sm sm:text-2xl sm:pt-1 truncate">
            {title.toUpperCase()}
          </CardTitle>
          <CardDescription className="max-sm:text-xs">
            [ {releaseDate?.split("-")[0] || "N/A"} ]
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
