import { createContext, ReactElement, useState } from "react";

interface LibraryContextType {
  category: "all" | "movie" | "tv";
  sortBy: "popularity" | "added_date" | "rating";
  updateCategory: (category: "all" | "movie" | "tv") => void;
  updateSortBy: (sort: "popularity" | "added_date" | "rating") => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LibraryContext = createContext<LibraryContextType>({
  category: "all",
  sortBy: "popularity",
  updateCategory: () => {},
  updateSortBy: () => {},
});

interface LibraryProviderProps {
  children: ReactElement[];
}

export default function LibraryProvider({ children }: LibraryProviderProps) {
  const [category, setCategory] =
    useState<LibraryContextType["category"]>("all");

  const [sortBy, setSortBy] = useState<LibraryContextType["sortBy"]>(() => {
    const savedSort = localStorage.getItem("kepler-sort-by");
    return (savedSort as LibraryContextType["sortBy"]) || "popularity";
  });

  const updateCategory = (newCategory: "all" | "movie" | "tv") => {
    setCategory(newCategory);
  };

  const updateSortBy = (sort: "popularity" | "added_date" | "rating") => {
    setSortBy(sort);
    localStorage.setItem("kepler-sort-by", sort);
  };

  return (
    <LibraryContext.Provider
      value={{ category, sortBy, updateCategory, updateSortBy }}
    >
      {children}
    </LibraryContext.Provider>
  );
}
