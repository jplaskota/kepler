import { createContext, ReactElement, useContext, useState } from "react";

type Category = "all" | "movie" | "tv";
type SortBy = "popularity" | "added_date" | "rating";

interface LibraryContextType {
  category: Category;
  sortBy: SortBy;
  updateCategory: (category: Category) => void;
  updateSortBy: (sort: SortBy) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LibraryContext = createContext<LibraryContextType>({
  category: "all",
  sortBy: "added_date",
  updateCategory: () => {},
  updateSortBy: () => {},
});

interface LibraryProviderProps {
  children: ReactElement[] | ReactElement;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLibraryContext() {
  return useContext(LibraryContext);
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
