import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { MovieSearch } from "@server-models/movie.model";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface MovieCardProps {
  item: MovieSearch;
  search?: boolean;
}

export default function MovieCard({ item }: MovieCardProps) {
  const [load, setLoad] = useState<boolean>(false);
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

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
