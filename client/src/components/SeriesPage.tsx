import { useSeriesActions } from "@/hooks/useSeriesActions";
import { userQueryOptions } from "@/services/auth.services";
import { cn } from "@/utils/utils";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { TSeries, TSeriesSearch } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

interface SeriesPageProps {
  series: TSeries | TSeriesSearch;
}

// Add helper function for type guard
const isStoredSeries = (series: TSeries | TSeriesSearch): series is TSeries => {
  return "_id" in series;
};

export default function SeriesPage({ series }: SeriesPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useQuery(userQueryOptions);
  const { addSeries, deleteSeries } = useSeriesActions();

  const handleAdd = () => {
    if (data) {
      addSeries.mutate({
        seriesData: series,
        userId: data.user.id,
      });
    } else {
      toast.error("You must be logged in to add to your list");
    }
  };

  const handleDelete = () => {
    if (isStoredSeries(series)) {
      deleteSeries.mutate(series._id.toString());
    }
  };

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + series.poster_path;

  // Replace the current check with the type guard
  const isBookmarked = isStoredSeries(series);

  return (
    <div className="animate-fade-in">
      <Card className="flex md:max-w-[1200px] max-md:flex-col gap-4 p-3 mx-4 mb-4 font-Montserrat">
        {loading && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={posterUrl}
          alt="poster"
          loading="lazy"
          className={cn(loading && "h-0 w-0", "md:max-h-[600px] rounded-md")}
          onLoad={() => setLoading(false)}
          crossOrigin="anonymous"
        />
        <div className="flex flex-col-reverse md:flex-col justify-between items-end gap-8 font-Montserrat">
          {isBookmarked ? (
            <nav className="flex gap-2 items-center sm:gap-4">
              <Button>Archive</Button>
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <TrashIcon className="w-4 h-4" />
              </Button>
            </nav>
          ) : (
            <Button size="icon" onClick={handleAdd}>
              <PlusIcon className="w-4 h-4" />
            </Button>
          )}
          <article>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="flex gap-2 font-Anton text-5xl sm:text-6xl lg:text-8xl">
                  {series.name.toUpperCase()}
                </p>
                <div className="flex gap-2 text-md sm:text-xl font-montserrat">
                  <p>[ {series.first_air_date.split("-")[0]} ]</p>
                  <p>[ {series.number_of_seasons} seasons ]</p>
                  <p>[ {series.vote_average} ]</p>
                </div>
              </div>
              <Separator />
              <p>{series.overview}</p>
              <Separator />
              <p>[ {series.genres.join(" ] [ ")} ]</p>
              <Separator />
            </div>
          </article>
        </div>
      </Card>
    </div>
  );
}
