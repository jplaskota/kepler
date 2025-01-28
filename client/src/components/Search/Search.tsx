import { Button } from "@/components/ui/button";
import { useSearchShortcuts } from "@/hooks/useSearchShortcuts";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SearchModal from "./SearchModal";

export function Search() {
  const [open, setOpen] = useState(false);
  useSearchShortcuts(setOpen);

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <SearchIcon className="w-4 h-4" />
      </Button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
