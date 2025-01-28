import { deleteSeriesById, postSeries } from "@/services/series.services";
import type { TSeriesSearch } from "@server-models/series.model";
import { useMutation } from "@tanstack/react-query";
import { useLibrary } from "./useLibrary";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useSeriesActions() {
  const { refetchLibrary } = useLibrary();
  const navigate = useNavigate();

  const addSeries = useMutation({
    mutationFn: ({ seriesData, userId }: { seriesData: TSeriesSearch; userId: string }) => 
      postSeries(seriesData, userId),
    onSuccess: () => {
      toast.success("Series added to your list");
      refetchLibrary();
      navigate({ to: "/" });
    },
  });

  const deleteSeries = useMutation({
    mutationFn: (id: string) => deleteSeriesById(id),
    onSuccess: () => {
      toast.success("Series deleted");
      refetchLibrary();
      navigate({ to: "/" });
    },
  });

  return { addSeries, deleteSeries };
}
