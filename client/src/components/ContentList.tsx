import { type Movie } from "@server-models/movie.model";
import { type Series } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { getContent } from "../services/content.services";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";
import SkeletonContent from "./SkeletonContent";

interface ContentListProps {
  category: string;
}

export default function ContentList({ category }: ContentListProps) {
  const [cols, setCols] = useState<number>(2);

  const {
    isLoading,
    isError,
    data: content,
  } = useQuery({
    queryKey: ["content", { category }],
    queryFn: () => getContent(category),
  });

  useEffect(() => {
    const calculateCols = () => {
      const width = window.innerWidth;
      let maxCols;

      switch (true) {
        case width > 1700:
          maxCols = 5;
          break;
        case width <= 1700 && width > 1300:
          maxCols = 4;
          break;
        case width <= 1300 && width > 1000:
          maxCols = 3;
          break;
        default:
          maxCols = 2;
          break;
      }

      if (content && content.length >= maxCols) {
        return maxCols;
      }

      return content ? content.length : maxCols;
    };

    const handleResize = () => {
      setCols(calculateCols());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [content]);

  return isLoading ? (
    <SkeletonContent cols={cols} />
  ) : isError ? (
    <div>Error...</div>
  ) : content ? (
    <>
      <Masonry
        className="flex gap-4 w-fit"
        breakpointCols={cols}
        columnClassName="w-full"
      >
        {content.map((item: Movie | Series) => {
          if (item.media_type === "movie") {
            return <MovieCard key={item.id} item={item as Movie} />;
          }
          return <SeriesCard key={item.id} item={item as Series} />;
        })}
      </Masonry>
    </>
  ) : (
    <div>No data</div>
  );
}
