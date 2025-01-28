import { useMovieActions } from "@/hooks/useMovieActions";
import { userQueryOptions } from "@/services/auth.services";
import { cn } from "@/utils/utils";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { TMovie, TMovieSearch } from "@server-models/movie.model";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

interface MoviePageProps {
  movie: TMovie | TMovieSearch;
}

// Add this helper function
const isStoredMovie = (movie: TMovie | TMovieSearch): movie is TMovie => {
  return "_id" in movie;
};

export default function MoviePage({ movie }: MoviePageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useQuery(userQueryOptions);
  const { addMovie, deleteMovie } = useMovieActions();

  const handleAdd = () => {
    if (data) {
      addMovie.mutate({
        movieData: movie,
        userId: data.user.id,
      });
    } else {
      toast.error("You must be logged in to add to your list");
    }
  };

  const handleDelete = () => {
    if (isStoredMovie(movie)) {
      deleteMovie.mutate(movie._id.toString());
    }
  };

  // Construct poster URL
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + movie.poster_path;

  // Replace the current check with the type guard
  const isBookmarked = isStoredMovie(movie);

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
                  {movie.title.toUpperCase()}
                </p>
                <div className="flex gap-2 text-md sm:text-xl font-montserrat">
                  <p>[ {movie.release_date.split("-")[0]} ]</p>
                  <p>[ {movie.director} ]</p>
                  <p>[ {movie.vote_average} ]</p>
                </div>
              </div>
              <Separator />
              <p>{movie.overview}</p>
              <Separator />
              <p>[ {movie.genres.join(" ] [ ")} ]</p>
              <Separator />
            </div>
          </article>
        </div>
      </Card>
    </div>
  );
}
