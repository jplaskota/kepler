import { Card, CardDescription } from "@/components/ui/card";
import { searchByName } from "@/services/search.services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

interface SearchModalProps {
  onClose: () => void;
}

const noResults = (
  <Card className="p-6 flex justify-center">
    <CardDescription>Nothing found</CardDescription>
  </Card>
);

export default function SearchModal({ onClose }: SearchModalProps) {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [content, setContent] = useState<typeof data>(undefined);
  const [dataStatus, setDataStatus] = useState<"success" | "noFound" | null>(
    null
  );

  // Get the portal root element
  const portalRoot = document.getElementById("portal")!;

  // Search by name using the debounced input value
  const { isLoading, isError, data } = useQuery({
    queryKey: ["search", { searchValue }],
    queryFn: () => searchByName(searchValue),
    enabled: searchValue.length > 0,
  });

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
      setSearchValue(value.trim());
    }, 500);
  };

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.warning("Something went wrong");
    }
  }, [isError]);

  useEffect(() => {
    // Scroll to the top of the search results
    if (searchContainerRef.current) {
      searchContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (data && (data.movies.length > 0 || data.series.length > 0)) {
      setDataStatus("success");
      setContent(data);
    } else {
      if (data) {
        setDataStatus("noFound");
      }
    }
  }, [data]);

  return createPortal(
    <div
      className="fixed inset-0 p-4 bg-black/70 backdrop-blur-sm z-10 flex justify-center sm:items-center animate-fade-in-up"
      onClick={() => onClose()}
    >
      <Card
        className="w-full sm:w-fit sm:min-w-[500px] sm:max-w-[1000px] h-fit max-h-[75vh] sm:max-h-[85vh] p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 bg-background"
        onClick={(e) => e.stopPropagation()} // Prevent event propagation
      >
        <SearchBar
          changeHandler={handleInputChange}
          inputValue={inputValue}
          onClear={() => setInputValue("")}
          onClose={onClose}
          isLoading={isLoading}
        />
        {dataStatus === "success" && content && (
          <SearchResult results={content} />
        )}
        {dataStatus === "noFound" && noResults}
      </Card>
    </div>,
    portalRoot
  );
}
