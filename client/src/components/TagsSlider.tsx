import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface TagsSliderProps {
  tags: string[];
  className?: string;
}

export default function TagsSlider({ tags, className }: TagsSliderProps) {
  const tagsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const container = tagsRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = tagsRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (tagsRef.current) {
      const scrollAmount = direction === "left" ? -50 : 50;
      tagsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div
      className={cn("group/tags relative", className)}
      onClick={(e) => e.preventDefault()}
    >
      <div
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hidden sm:group-hover/tags:flex",
          showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            scroll("left");
          }}
        >
          <ChevronLeftIcon className="h-3 w-3" />
        </Button>
      </div>

      <div
        ref={tagsRef}
        className="flex gap-1.5 overflow-x-auto no-scrollbar snap-x snap-mandatory"
      >
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="max-sm:text-xs shrink-0 snap-start select-none cursor-default"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hidden sm:group-hover/tags:flex",
          showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            scroll("right");
          }}
        >
          <ChevronRightIcon className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}