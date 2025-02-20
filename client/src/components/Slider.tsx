import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import ContentCard from "./ContentCard";
import { Button } from "./ui/button";

type SliderItem = {
  id: number;
  title: string;
  subtitle?: string;
  image_path: string | null;
};

interface SliderProps {
  items: SliderItem[];
  title?: string;
}

export default function Slider({ items, title }: SliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-2">
      {title && (
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      )}
      <div className="group relative">
        <div
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 md:flex hidden",
            showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Button
            variant="secondary"
            size="icon"
            className="h-24 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => scroll("left")}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </Button>
        </div>

        <div
          ref={scrollContainerRef}
          className="w-full flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {items?.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              image_path={item.image_path}
              className="w-64"
            />
          ))}
        </div>

        <div
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 md:flex hidden",
            showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Button
            variant="secondary"
            size="icon"
            className="h-24 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => scroll("right")}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
