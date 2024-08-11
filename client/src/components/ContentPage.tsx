import type { Movie } from "@server-models/movie.model";
import type { Series } from "@server-models/series.model";
import { useState } from "react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

interface ContentPageProps {
  item: Movie | Series;
}

export default function ContentPage({ item }: ContentPageProps) {
  const [loading, setLoading] = useState<boolean>(true);

  // Check if the item is a Series or a Movie
  const isSeries = item.media_type === "tv";

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  // Determine the title and other properties based on the type
  const title = isSeries ? (item as Series).name : (item as Movie).title,
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

  return (
    <div className="h-full px-4 py-1 font-Montserrat animate-fade-in">
      <Card className="flex max-sm:flex-col sm:items-end gap-4 p-4 font-Montserrat">
        {loading && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={posterUrl}
          loading="lazy"
          alt="poster"
          className="w-full rounded-md max-h-full"
          onLoad={() => setLoading(false)}
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="flex gap-2 items-end font-Anton text-5xl sm:text-7xl md:text-9xl">
              {title.toUpperCase()}
            </p>
            <div className="flex gap-2 text-md sm:text-xl font-montserrat">
              <p>[ {releaseDate.split("-")[0]} ]</p>
              <p>[ {additionalInfo} ]</p>
              <p>[ {voteAverage.toFixed(1)} ]</p>
            </div>
          </div>
          <Separator />
          <p>{overview}</p>
          <Separator />
          <p>[ {genres.join(" ] [ ")} ]</p>
          <Separator />
          <a href={homepage}>{homepage}</a>
        </div>
      </Card>
    </div>
  );
}
