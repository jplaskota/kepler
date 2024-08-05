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
      searchContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [results]);

  return (
    <div
      ref={searchContainerRef}
      className="w-fit h-fit flex flex-col overflow-y-auto gap-4"
    >
      <div className="w-fit max-w-[90vw] grid grid-cols-3 sm:grid-cols-4 gap-2">
        {results.series.map((series) => {
          return <SearchSeriesCard key={series.id} item={series} />;
        })}
      </div>
      <Separator orientation="horizontal" />
      <div className="w-fit max-w-[90vw] grid grid-cols-3 sm:grid-cols-4 gap-2">
        {results.movies.map((movie) => {
          return <SearchMovieCard key={movie.id} item={movie} />;
        })}
      </div>
    </div>
  );
}

// TODO improve scroll to top
