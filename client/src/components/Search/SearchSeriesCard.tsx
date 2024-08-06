import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { SeriesSearch } from "@server-models/series.model";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface SeriesCardProps {
  item: SeriesSearch;
  search?: boolean;
}

export default function SearchSeriesCard({ item }: SeriesCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

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
