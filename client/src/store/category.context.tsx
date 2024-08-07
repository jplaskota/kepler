import { createContext, ReactElement, useState } from "react";

interface ICategory {
  category: "all" | "movie" | "tv";
  updateCategory: (category: "all" | "movie" | "tv") => void;
}
export const CategoryContext = createContext<ICategory>({
  category: "all",
  updateCategory: () => {},
});

interface CategoryProviderProps {
  children: ReactElement[];
}

export default function CategoryProvider({ children }: CategoryProviderProps) {
  const [category, setCategory] = useState<ICategory["category"]>("all");

  const updateCategory = (newCategory: "all" | "movie" | "tv") => {
    setCategory(newCategory);
  };

  return (
    <CategoryContext.Provider value={{ category, updateCategory }}>
      {...children}
    </CategoryContext.Provider>
  );
}
