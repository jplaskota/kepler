import { Card, CardDescription } from "@/components/ui/card";
import { useSearch } from "@/hooks/useSearch";
import type { SearchModalProps } from "@/types/search.types";
import { createPortal } from "react-dom";
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

  return createPortal(
    <div
      className="fixed inset-0 py-16 px-4 bg-black/70 backdrop-blur-sm z-10 flex justify-center sm:items-center animate-fade-in-up"
      onClick={onClose}
    >
      <Card
        className="w-full sm:w-fit sm:min-w-[500px] sm:max-w-[1000px] h-fit max-h-[75vh] sm:max-h-[85vh] p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchBar
          changeHandler={handleInputValueChange}
          inputValue={inputValue}
          onClose={onClose}
          isLoading={isLoading}
        />
        {movies && series && searchStatus && (
          <SearchResult moviesList={movies} seriesList={series} onClose={onClose} />
        )}
        {!searchStatus && noResults}
      </Card>
    </div>,
    document.getElementById("portal")!
  );
}
