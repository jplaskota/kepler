import type { Movie } from "@server-models/movie.model";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface MoviePageProps {
  item: Movie;
}

export default function MoviePage({ item }: MoviePageProps) {
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;
  return (
    <div className="h-full px-4 py-1 font-Montserrat animate-fade-in">
      <Card className="flex max-sm:flex-col sm:items-end gap-4 p-4 font-Montserrat">
        <img
          src={posterUrl}
          loading="lazy"
          alt="poster"
          className="w-full rounded-md max-h-full"
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="flex gap-2 items-end font-Anton text-5xl sm:text-7xl md:text-9xl">
              {item.title.toUpperCase()}
            </p>
            <div className="flex gap-2 text-md sm:text-xl font-montserrat">
              <p>[ {item.release_date.split("-")[0]} ]</p>
              <p>[ {item.runtime} min ]</p>
              <p>[ {item.vote_average.toFixed(1)} ]</p>
            </div>
          </div>
          <Separator />
          <p>{item.overview}</p>
          <Separator />
          <p>[ {item.genres.join(" ] [ ")} ]</p>
          <Separator />
          <a href={item.homepage}>{item.homepage}</a>
        </div>
      </Card>
    </div>
  );
}
