import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchByName } from "@/services/search.services";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        setSearchValue(value);
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
      onClick={() => {
        inputValue.length > 0 && setInputValue("");
        searchValue.length > 0 && setSearchValue("");
        onClose();
      }}
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
            {searchResults.series.map((res) => {
              return <p key={res.id}>{res.name}</p>;
            })}
          </>
        ) : (
          <Card className="p-6 bg-background rounded-md"></Card>
        )}
      </div>
    </div>,
    portalRoot
  );
}
