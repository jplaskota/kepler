import { deleteMovieById, postMovie } from "@/services/movie.services";
import type { TMovieSearch } from "@server-models/movie.model";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useLibrary } from "./useLibrary";

export function useMovieActions() {
  const { refetchLibrary } = useLibrary();
  const navigate = useNavigate();

  const addMovie = useMutation({
    mutationFn: ({
      movieData,
      userId,
    }: {
      movieData: TMovieSearch;
      userId: string;
    }) => postMovie(movieData, userId),
    onSuccess: () => {
      toast.success("Movie added to your list");
      refetchLibrary();
      navigate({ to: "/" });
    },
  });

  const deleteMovie = useMutation({
    mutationFn: (id: string) => deleteMovieById(id),
    onSuccess: () => {
      toast.success("Movie deleted");
      refetchLibrary();
      navigate({ to: "/" });
    },
  });

  return { addMovie, deleteMovie };
}
