import { cn } from "@/utils/utils";

interface CategoryProps {
  category: string;
  onSelect: (cat: string) => void;
}

export default function Category({ onSelect, category }: CategoryProps) {
  return (
    <div className="flex flex-col">
      <div className="w-[400px] grid grid-cols-3 gap-1">
        <button
          onClick={() => onSelect("all")}
          className={cn(
            "text-transition-colors ",
            category === "all"
              ? "text-primary hover:text-foreground"
              : "text-foreground/60 hover:text-foreground/80"
          )}
        >
          All
        </button>
        <button
          onClick={() => onSelect("movie")}
          className={cn(
            "transition-colors",
            category === "movie"
              ? "text-primary hover:text-foreground"
              : "text-foreground/60 hover:text-foreground/80"
          )}
        >
          Movies
        </button>
        <button
          onClick={() => onSelect("tv")}
          className={cn(
            "text-transition-colors ",
            category === "tv"
              ? "text-primary hover:text-foreground"
              : "text-foreground/60 hover:text-foreground/80"
          )}
        >
          Series
        </button>
      </div>
    </div>
  );
}
