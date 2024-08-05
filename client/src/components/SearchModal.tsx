import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchByName } from "@/services/search.services";
import { LoopIcon } from "@radix-ui/react-icons";
import { MovieSearch } from "@server-models/movie.model";
import { SeriesSearch } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SearchMovieCard from "./SearchMovieCard";
import SearchSeriesCard from "./SearchSeriesCard";
import { Separator } from "./ui/separator";

interface SearchModalProps {
  onClose: () => void;
}

type SearchResults = {
  movies: MovieSearch[];
  series: SeriesSearch[];
};

export default function SearchModal({ onClose }: SearchModalProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle input change with debounce
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    // Clear the debounce timer if it exists
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new debounce timer
    debounceTimer.current = setTimeout(() => {
      if (value.trim()) {
        setSearchValue(value.trim());
      } else {
        setSearchValue("");
      }
    }, 500);
  };

  // Search by name using the debounced input value
  const { isLoading, isError, data } = useQuery({
    queryKey: ["search", { searchValue }],
    queryFn: () => searchByName(searchValue),
    enabled: searchValue.length > 0,
  });

  // Set search results when data is available
  useEffect(() => {
    if (data) {
      setSearchResults(data as SearchResults);
    }
  }, [data]);

  const portalRoot = document.getElementById("portal")!;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex justify-center sm:items-center"
      onClick={() => {
        inputValue.length > 0 && setInputValue("");
        searchValue.length > 0 && setSearchValue("");
        onClose();
      }}
    >
      <Card
        className="w-[90vw] sm:w-[1000px] h-fit max-h-[80vh] sm:max-h-[85vh] p-4 bg-background my-4 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent event propagation
      >
        <Input
          placeholder="Search..."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="bg-background text-xl py-5"
          autoFocus
        />
        {(searchValue.length > 0 || searchResults) &&
          (isLoading ? (
            <Card className="p-6 bg-background rounded-md">
              <div className="flex justify-center items-center">
                <LoopIcon />
              </div>
            </Card>
          ) : isError ? (
            <Card className="p-6 bg-background rounded-md">
              <div className="flex justify-center items-center">error</div>
            </Card>
          ) : searchResults &&
            searchResults.series.length > 0 &&
            searchResults.movies.length > 0 ? (
            <div className="w-fit h-fit flex flex-col overflow-y-auto gap-4">
              <div className="w-fit max-w-[90vw] grid grid-cols-3 sm:grid-cols-4 gap-2">
                {searchResults.series.map((series) => {
                  return <SearchSeriesCard key={series.id} item={series} />;
                })}
              </div>
              <Separator orientation="horizontal" />
              <div className="w-fit max-w-[90vw] grid grid-cols-3 sm:grid-cols-4 gap-2">
                {searchResults.movies.map((movie) => {
                  return <SearchMovieCard key={movie.id} item={movie} />;
                })}
              </div>
            </div>
          ) : (
            <Card className="p-6 flex justify-center">
              <CardDescription>Nothing found</CardDescription>
            </Card>
          ))}
      </Card>
    </div>,
    portalRoot
  );
}

// TODO series length and movie length
// TODO masonry layout ?
// FIXME width bug
