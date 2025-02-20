import { Badge } from "@/components/ui/badge";
import {
  actorsToSliderItems,
  cn,
  contentToSliderItems,
  seasonsToSliderItems,
} from "@/lib/utils";
import { useLanguage } from "@/store/language.context";
import { usePreferencesContext } from "@/store/preferences.context";
import type { TFormattedMovie, TFormattedSeries } from "@/types/media.types";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import type { TActors } from "@server-models/additional.model";
import type { TMovieSearchCard } from "@server-models/movie.model";
import type { TSeriesSearchCard } from "@server-models/series.model";
import { useState } from "react";
import Slider from "./Slider";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface DetailedPageProps {
  media: TFormattedMovie | TFormattedSeries;
  saved: boolean;
  actors: TActors | undefined;
  recommendations: Array<TMovieSearchCard | TSeriesSearchCard> | undefined;
  similar: Array<TMovieSearchCard | TSeriesSearchCard> | undefined;
  onDelete: () => void;
  onAdd: () => void;
}

export default function DetailedPage({
  media,
  saved,
  actors,
  recommendations,
  similar,
  onDelete,
  onAdd,
}: DetailedPageProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const { showActors, showRecommendations, showSimilar } =
    usePreferencesContext();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-4 sm:gap-8 px-2 sm:px-4 pb-2 sm:pb-4 w-full max-w-[1200px]">
      <Card className="flex max-md:flex-col gap-4 p-3 font-Montserrat">
        {imageLoading && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={import.meta.env.VITE_IMAGE_BASE_URL + media.poster_path}
          alt="poster"
          loading="lazy"
          className={cn(
            imageLoading && "h-0 w-0",
            "md:max-h-[600px] rounded-md"
          )}
          onLoad={() => setImageLoading(false)}
          crossOrigin="anonymous"
        />
        <div className="flex flex-col-reverse md:flex-col justify-between items-end gap-8 font-Montserrat">
          <div className="hidden sm:block">
            {saved ? (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete()}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            ) : (
              <Button size="icon" onClick={() => onAdd()}>
                <PlusIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
          <article className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 font-Anton text-5xl sm:text-6xl lg:text-8xl">
                {media.title.toUpperCase()}
              </p>
              <div className="flex gap-2 text-md sm:text-xl font-montserrat">
                <p>{media.year.split("-")[0]}</p>
                <p>|</p>
                <p>{media.details}</p>
                <p>|</p>
                <p>{media.vote_average}</p>
              </div>
            </div>
            <Separator />
            <p>{media.overview}</p>
            <Separator />
            <div className="flex flex-wrap gap-2">
              {media.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="text-sm sm:text-base select-none cursor-default"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </article>
        </div>
      </Card>
      {"seasons" in media && media.seasons && media.seasons.length > 0 && (
        <Slider
          items={seasonsToSliderItems(media.seasons)}
          title={t("detailed.seasonsSlider.title")}
        />
      )}
      {showActors &&
        (actors === undefined ? (
          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="w-64 shrink-0 snap-start first:ml-0 p-3 flex flex-col gap-3 font-Montserrat"
              >
                <Skeleton className="w-full aspect-[2/3]" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : (
          actors.length > 0 && (
            <Slider
              items={actorsToSliderItems(actors)}
              title={t("detailed.actorsSlider.title")}
            />
          )
        ))}
      {showRecommendations &&
        (recommendations === undefined ? (
          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="w-64 shrink-0 snap-start first:ml-0 p-3 flex flex-col gap-3 font-Montserrat"
              >
                <Skeleton className="w-full aspect-[2/3]" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : (
          recommendations.length > 0 && (
            <Slider
              items={contentToSliderItems(recommendations)}
              title={t("detailed.recommendationsSlider.title")}
            />
          )
        ))}
      {showSimilar &&
        (similar === undefined ? (
          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="w-64 shrink-0 snap-start first:ml-0 p-3 flex flex-col gap-3 font-Montserrat"
              >
                <Skeleton className="w-full aspect-[2/3]" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : (
          similar.length > 0 && (
            <Slider
              items={contentToSliderItems(similar)}
              title={t("detailed.similarSlider.title")}
            />
          )
        ))}
      <div className="sm:hidden">
        {saved ? (
          <Button
            variant="destructive"
            size="default"
            className="w-full"
            onClick={() => onDelete()}
          >
            <p>Delete</p>
          </Button>
        ) : (
          <Button size="default" className="w-full" onClick={() => onAdd()}>
            <p>Add to Library</p>
          </Button>
        )}
      </div>
    </div>
  );
}
