import { Card, CardDescription } from "@/components/ui/card";
import { useSearch } from "@/hooks/useSearch";
import type { SearchModalProps } from "@/types/search.types";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

const noResults = (
  <Card className="p-6 flex justify-center">
    <CardDescription>Nothing found</CardDescription>
  </Card>
);

export default function SearchModal({ onClose }: SearchModalProps) {
  const {
    inputValue,
    movies,
    series,
    searchStatus,
    isLoading,
    handleInputValueChange,
  } = useSearch();

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  console.log(movies.length > 0 && series.length > 0 && searchStatus);

  return createPortal(
    <div
      className="fixed inset-0 py-16 px-4 bg-black/70 backdrop-blur-sm z-10 flex justify-center sm:items-center animate-fade-in-up"
      onClick={onClose}
    >
      <Card
        className="w-full sm:w-fit sm:min-w-[500px] sm:max-w-[1000px] h-fit max-h-[75vh] sm:max-h-[85vh] gap-4 p-2 sm:p-4 flex flex-col bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchBar
          changeHandler={handleInputValueChange}
          inputValue={inputValue}
          onClose={onClose}
          isLoading={isLoading}
        />
        {(movies.length > 0 || series.length > 0) && searchStatus && (
          <SearchResult
            moviesList={movies}
            seriesList={series}
            onClose={onClose}
          />
        )}
        {!searchStatus && noResults}
      </Card>
    </div>,
    document.getElementById("portal")!
  );
}
