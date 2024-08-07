import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi";

import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";

export function Search() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button variant={"outline"} size={"icon"} onClick={() => setOpen(true)}>
        <FiSearch />
      </Button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
