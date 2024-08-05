import { MovieSearch } from "@server-models/movie.model";
import { SeriesSearch } from "@server-models/series.model";
import { useEffect, useRef } from "react";
import { Separator } from "../ui/separator";
import SearchMovieCard from "./SearchMovieCard";
import SearchSeriesCard from "./SearchSeriesCard";

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
            return <SearchMovieCard key={movie.id} item={movie} />;
          })}
        </div>
        <Separator orientation="horizontal" />
        <div className="w-fit max-w-[90vw] h-fit grid grid-cols-3 sm:grid-cols-4 gap-2">
          {results.series.map((series) => {
            return <SearchSeriesCard key={series.id} item={series} />;
          })}
        </div>
      </div>
    </div>
  );
}
