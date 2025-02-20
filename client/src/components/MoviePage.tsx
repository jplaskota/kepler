import { useMovieActions } from "@/hooks/useMovieActions";
import { usePreferencesContext } from "@/store/preferences.context";
import { formatMovie } from "@/lib/utils";
import {
  getActors,
  getRecommendations,
  getSimilar,
} from "@/services/additional.services";
import { userQueryOptions } from "@/services/auth.services";
import { getMovieById } from "@/services/movie.services";
import { searchMovieById } from "@/services/search.services";
import type { TMovie, TMovieSearch } from "@server-models/movie.model";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import DetailedPage from "./DetailedPage";
import DetailedPageSkeleton from "./DetailedPageSkeleton";

interface MoviePageProps {
  id: string;
  saved: boolean;
}

export default function MoviePage({ id, saved }: MoviePageProps) {
  const { data: userData } = useQuery(userQueryOptions);
  const { addMovie, deleteMovie } = useMovieActions();
  const { showActors, showRecommendations, showSimilar } =
    usePreferencesContext();

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [saved ? "library-movie" : "search-movie", id],
    queryFn: () => (saved ? getMovieById(id) : searchMovieById(id)),
  });

  const { data: actors } = useQuery({
    queryKey: ["actors", id],
    queryFn: () =>
      saved
        ? getActors(movie!.tmdb_id.toString(), "movie")
        : getActors(id, "movie"),
    enabled: showActors,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () =>
      saved
        ? getRecommendations(movie!.tmdb_id.toString(), "movie")
        : getRecommendations(id, "movie"),
    enabled: showRecommendations,
  });

  const { data: similar } = useQuery({
    queryKey: ["similar", id],
    queryFn: () =>
      saved
        ? getSimilar(movie!.tmdb_id.toString(), "movie")
        : getSimilar(id, "movie"),
    enabled: showSimilar,
  });

  if (isLoading) {
    return <DetailedPageSkeleton />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const handleAdd = () => {
    if (!userData) {
      toast.error("You must be logged in to add to your list");
      return;
    }

    addMovie.mutate({
      movieData: movie as TMovieSearch,
      userId: userData.user.id,
    });
  };

  const handleDelete = () => {
    deleteMovie.mutate((movie as TMovie)._id.toString());
  };

  return (
    <DetailedPage
      media={formatMovie(movie!)}
      saved={saved}
      actors={actors}
      recommendations={recommendations?.map((item) => ({
        ...item,
        media_type: "movie" as const,
      }))}
      similar={similar?.map((item) => ({
        ...item,
        media_type: "movie" as const,
      }))}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}
