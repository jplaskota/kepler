import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";
import { type Movie } from "@server-models/movie.model";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface MovieCardProps {
  item: Movie;
  search?: boolean;
}

export default function MovieCard({ item }: MovieCardProps) {
  const [load, setLoad] = useState<boolean>(false);
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  return (
    <Card className="sm:w-[300px] mb-4 select-none">
      <CardHeader className="p-3 sm:p-4 ">
        {!load && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={posterUrl}
          alt="poster"
          loading="lazy"
          className={cn(!load && "h-0 w-0")}
          onLoad={() => setLoad(true)}
        />
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
