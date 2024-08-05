import { Card, CardDescription } from "@/components/ui/card";
import { searchByName } from "@/services/search.services";
import { MovieSearch } from "@server-models/movie.model";
import { SeriesSearch } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

interface SearchModalProps {
  onClose: () => void;
}

type SearchResults = {
  movies: MovieSearch[];
  series: SeriesSearch[];
};

const errorInfo = (
  <Card className="p-6 bg-background rounded-md">
    <div className="flex justify-center items-center">error</div>
  </Card>
);

const noResults = (
  <Card className="p-6 flex justify-center">
    <CardDescription>Nothing found</CardDescription>
  </Card>
);

export default function SearchModal({ onClose }: SearchModalProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Get the portal root element
  const portalRoot = document.getElementById("portal")!;

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
  const { isError, data } = useQuery({
    queryKey: ["search", { searchValue }],
    queryFn: () => searchByName(searchValue),
    enabled: searchValue.length > 0,
  });

  // Set search results when data is available
  useEffect(() => {
    if (data) {
      setSearchResults(data as SearchResults);

      // Scroll to the top of the search results
      if (searchContainerRef.current) {
        searchContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [data, searchResults]);

  return createPortal(
    <div
      className="fixed inset-0 p-4 bg-black/70 backdrop-blur-sm z-10 flex justify-center sm:items-center"
      onClick={() => onClose()}
    >
      <Card
        className="w-full sm:w-fit sm:min-w-[500px] sm:max-w-[1000px] h-fit max-h-[75vh] sm:max-h-[85vh] p-4 flex flex-col gap-4 bg-background"
        onClick={(e) => e.stopPropagation()} // Prevent event propagation
      >
        <SearchBar
          changeHandler={handleInputChange}
          inputValue={inputValue}
          onClear={() => setInputValue("")}
          onClose={onClose}
        />
        {(searchValue.length > 0 || searchResults) &&
          (isError && !searchResults ? (
            errorInfo
          ) : searchResults &&
            (searchResults.series.length > 0 ||
              searchResults.movies.length > 0) ? (
            <SearchResult results={searchResults} />
          ) : (
            noResults
          ))}
      </Card>
    </div>,
    portalRoot
  );
}

// TODO masonry layout ?
// TODO popup error
