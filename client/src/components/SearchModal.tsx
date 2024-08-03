import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchByName } from "@/services/search.services";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Movie } from "@server-models/movie.model";
import { Series } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    // Clear the debounce timer if it exists
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new debounce timer
    debounceTimer.current = setTimeout(() => {
      if (inputValue.trim()) {
        setSearchValue(inputValue);
      } else {
        setSearchValue("");
      }
    }, 500); // Debounce the search
  };

  const {
    isLoading,
    isError,
    data: searchResults,
  } = useQuery({
    queryKey: ["search", { searchValue }],
    queryFn: () => searchByName(searchValue),
    enabled: !!searchValue,
  });

  const portalRoot = document.getElementById("portal")!;

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[90vw] max-w-lg h-fit flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent event propagation
      >
        <Input
          placeholder="Search..."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="bg-background"
        />
        {isLoading ? (
          <Card className="p-6 bg-background rounded-md">
            <div className="flex justify-center items-center">...</div>
          </Card>
        ) : isError ? (
          <Card className="p-6 bg-background rounded-md">
            <div className="flex justify-center items-center">error</div>
          </Card>
        ) : searchResults ? (
          <>
            <p>
              {searchResults.series.map((res) => {
                return res.title;
              })}
            </p>
          </>
        ) : (
          <Card className="p-6 bg-background rounded-md"></Card>
        )}
      </div>
    </div>,
    portalRoot
  );
}
