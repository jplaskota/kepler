import ContentPage from "@/components/ContentPage";
import { searchById } from "@/services/search.services";
import { mediaTypeSchema } from "@/types/types";
import { Movie } from "@server-models/movie.model";
import { Series } from "@server-models/series.model";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createFileRoute("/_authenticated/search/$id")({
  validateSearch: mediaTypeSchema,
  component: Search,
});

function Search() {
  const { id } = Route.useParams();
  const { mediaType } = Route.useSearch();

  const queryFn = useCallback(() => searchById(id, mediaType), [id, mediaType]);

  const { data } = useSuspenseQuery({
    queryKey: ["item", { id, mediaType }],
    queryFn,
  });

  return <ContentPage item={data as Movie | Series} />;
}
