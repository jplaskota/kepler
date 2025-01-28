import type { SearchResultProps } from "@/types/search.types";
import { useEffect, useRef } from "react";
import { Separator } from "../ui/separator";
import SearchItemCard from "./SearchItemCard";

export default function SearchResult({
  moviesList,
  seriesList,
  onClose,
}: SearchResultProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = searchContainerRef.current;
    if (container) {
      container.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [moviesList, seriesList]);

  const hasMovies = moviesList && moviesList.length > 0;
  const hasSeries = seriesList && seriesList.length > 0;

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="w-fit flex flex-col gap-4" ref={searchContainerRef}>
        {hasMovies && (
          <div className="w-fit max-w-[90vw] h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {moviesList.map((movie) => (
              <SearchItemCard
                key={movie.tmdb_id}
                item={movie}
                onClose={onClose}
              />
            ))}
          </div>
        )}
        {hasMovies && hasSeries && <Separator orientation="horizontal" />}
        {hasSeries && (
          <div className="w-fit max-w-[90vw] h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {seriesList.map((series) => (
              <SearchItemCard
                key={series.tmdb_id}
                item={series}
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
