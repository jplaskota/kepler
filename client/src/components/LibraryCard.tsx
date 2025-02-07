import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TMovieCard } from "@server-models/movie.model";
import type { TSeriesCard } from "@server-models/series.model";
import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface LibraryCardProps {
  item: TMovieCard | TSeriesCard;
}

export default function LibraryCard({ item }: LibraryCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const genresRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  const handleScroll = () => {
    const container = genresRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = genresRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (genresRef.current) {
      const scrollAmount = direction === "left" ? -50 : 50;
      genresRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Link
      to="/library/$type/$id"
      params={{
        type: item.media_type,
        id: item._id,
      }}
      className="w-full sm:w-[300px]"
    >
      <Card>
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
          <div className="flex gap-1.5">
            <CardDescription className="max-sm:text-xs">
              {releaseDate.split("-")[0]}
            </CardDescription>
            <CardDescription className="max-sm:text-xs">|</CardDescription>
            <CardDescription className="max-sm:text-xs">
              {additionalInfo}
            </CardDescription>
            <CardDescription className="max-sm:text-xs">|</CardDescription>
            <CardDescription className="max-sm:text-xs">
              {item.vote_average}
            </CardDescription>
          </div>
          <div
            className="group/genres relative"
            onClick={(e) => e.preventDefault()}
          >
            <div
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hidden sm:group-hover/genres:flex",
                showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  scroll("left");
                }}
              >
                <ChevronLeftIcon className="h-3 w-3" />
              </Button>
            </div>

            <div
              ref={genresRef}
              className="flex gap-1.5 overflow-x-auto no-scrollbar snap-x snap-mandatory"
            >
              {item.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="max-sm:text-xs shrink-0 snap-start"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            <div
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hidden sm:group-hover/genres:flex",
                showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  scroll("right");
                }}
              >
                <ChevronRightIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

// TODO slider with actors
// TODO [series] slider with seasons
