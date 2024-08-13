import { MovieSearch } from "@server-models/movie.model";
import { SeriesSearch } from "@server-models/series.model";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Separator } from "../ui/separator";
import SearchItemCard from "./SearchItemCard";

interface SearchResultProps {
  results: {
    movies: MovieSearch[];
    series: SeriesSearch[];
  };
}

export default function SearchResult({ results }: SearchResultProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the top of the search results
  useEffect(() => {
    if (searchContainerRef.current) {
      searchContainerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [results]);

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="w-fit flex flex-col gap-4" ref={searchContainerRef}>
        <div className="w-fit max-w-[90vw] h-fit grid grid-cols-3 sm:grid-cols-4 gap-2">
          {results.movies.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={"/search/$id"}
                params={{ id: movie.id }}
                search={{
                  mediaType: "movie",
                }}
              >
                <SearchItemCard item={movie} />
              </Link>
            );
          })}
        </div>
        <Separator orientation="horizontal" />
        <div className="w-fit max-w-[90vw] h-fit grid grid-cols-3 sm:grid-cols-4 gap-2">
          {results.series.map((series) => {
            return (
              <Link
                key={series.id}
                to={"/search/$id"}
                params={{ id: series.id }}
                search={{
                  mediaType: "series",
                }}
              >
                <SearchItemCard item={series} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
