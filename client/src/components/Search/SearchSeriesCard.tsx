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
  const [load, setLoad] = useState<boolean>(false);
  const posterUrl = "image/t/p/original" + item.poster_path;

  return (
    <Card className="select-none">
      <CardHeader className="p-2 sm:p-4">
        {!load && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={posterUrl}
          alt="poster"
          loading="lazy"
          className={cn(!load && "h-0 w-0")}
          onLoad={() => setLoad(true)}
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
