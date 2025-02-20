import { useSeriesActions } from "@/hooks/useSeriesActions";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { formatSeries } from "@/lib/utils";
import { getActors } from "@/services/additional.services";
import { userQueryOptions } from "@/services/auth.services";
import { searchSeriesById } from "@/services/search.services";
import { getSeriesById } from "@/services/series.services";
import type { TSeries, TSeriesSearch } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import DetailedPage from "./DetailedPage";
import DetailedPageSkeleton from "./DetailedPageSkeleton";

interface SeriesPageProps {
  id: string;
  saved: boolean;
}

export default function SeriesPage({ id, saved }: SeriesPageProps) {
  const { data: userData } = useQuery(userQueryOptions);
  const { addSeries, deleteSeries } = useSeriesActions();
  const { showActors } = useUserPreferences();

  const {
    data: series,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [saved ? "library-series" : "search-series", id],
    queryFn: () => (saved ? getSeriesById(id) : searchSeriesById(id)),
  });

  const { data: actors } = useQuery({
    queryKey: ["actors", id],
    queryFn: () =>
      saved ? getActors(series!.tmdb_id.toString(), "tv") : getActors(id, "tv"),
    enabled: showActors,
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

    addSeries.mutate({
      seriesData: series as TSeriesSearch,
      userId: userData.user.id,
    });
  };

  const handleDelete = () => {
    deleteSeries.mutate((series as TSeries)._id.toString());
  };

  return (
    <DetailedPage
      media={formatSeries(series!)}
      saved={saved}
      actors={actors}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}
