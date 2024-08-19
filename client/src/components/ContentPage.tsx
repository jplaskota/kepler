import { deleteMovieById, postMovie } from "@/services/movie.services";
import { deleteSeriesById, postSeries } from "@/services/series.services";
import { cn } from "@/utils/utils";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Movie } from "@server-models/movie.model";
import type { Series } from "@server-models/series.model";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

interface ContentPageProps {
  item: Movie | Series;
}

export default function ContentPage({ item }: ContentPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate({ from: "/search/$id" });

  const isBookmarked = !!item.tmdb_id;

  // Check if the item is a Series or a Movie
  const isSeries = item.media_type === "tv";

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  // Determine the title and other properties based on the type
  const title = isSeries ? (item as Series).title : (item as Movie).title,
    releaseDate = isSeries
      ? (item as Series).first_air_date
      : (item as Movie).release_date,
    additionalInfo = isSeries
      ? `${(item as Series).number_of_seasons} seasons`
      : `${(item as Movie).runtime} mins`,
    voteAverage = isSeries
      ? (item as Series).vote_average
      : (item as Movie).vote_average,
    overview = isSeries ? (item as Series).overview : (item as Movie).overview,
    genres = item.genres,
    homepage = isSeries ? (item as Series).homepage : (item as Movie).homepage;

  const handleAdd = () => {
    if (item.media_type === "movie") {
      postMovie(item as Movie).then(() => {
        toast.success("Movie added to your list");
        navigate({ to: "/" });
      });
    } else {
      postSeries(item as Series).then(() => {
        toast.success("Series added to your list");
        navigate({ to: "/" });
      });
    }
  };

  const handleDelete = () => {
    if (item.media_type === "movie") {
      deleteMovieById(item.id).then(() => {
        toast.success("Movie deleted");
        navigate({ to: "/" });
      });
    } else {
      deleteSeriesById(item.id).then(() => {
        toast.success("Series deleted");
        navigate({ to: "/" });
      });
    }
  };

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
                  {title.toUpperCase()}
                </p>
                <div className="flex gap-2 text-md sm:text-xl font-montserrat">
                  <p>[ {releaseDate.split("-")[0]} ]</p>
                  <p>[ {additionalInfo} ]</p>
                  <p>[ {parseFloat(voteAverage).toFixed(1)} ]</p>
                </div>
              </div>
              <Separator />
              <p>{overview}</p>
              <Separator />
              <p>[ {genres.join(" ] [ ")} ]</p>
              <Separator />
              <a href={homepage}>{homepage}</a>
            </div>
          </article>
        </div>
      </Card>
    </div>
  );
}
