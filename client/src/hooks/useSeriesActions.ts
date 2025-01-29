import { deleteSeriesById, postSeries } from "@/services/series.services";
import type { TSeriesSearch } from "@server-models/series.model";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useLibrary } from "./useLibrary";

export function useSeriesActions() {
  const { refetchSeries } = useLibrary();
  const navigate = useNavigate();

  const addSeries = useMutation({
    mutationFn: ({
      seriesData,
      userId,
    }: {
      seriesData: TSeriesSearch;
      userId: string;
    }) => postSeries(seriesData, userId),
    onSuccess: () => {
      navigate({ to: "/" });
      refetchSeries();
      toast.success("Series added to your list");
    },
  });

  const deleteSeries = useMutation({
    mutationFn: (id: string) => deleteSeriesById(id),
    onSuccess: () => {
      navigate({ to: "/" });
      refetchSeries();
      toast.success("Series deleted");
    },
  });

  return { addSeries, deleteSeries };
}
