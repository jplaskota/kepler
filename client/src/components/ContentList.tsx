import { type Movie } from "@server-models/movie.model";
import { type Series } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyledContentList } from "../styles/ContentList.styles";
import { getContent } from "../utils/content.utils";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";

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
    console.log(content);
  }, [content]);

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
      return content ? content.length : 0;
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

  return (
    <StyledContentList className="movie-list" breakpointCols={cols}>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : content ? (
        content.map((item) => {
          if (item.media_type === "movie") {
            return <MovieCard key={item.id} item={item as Movie} />;
          }
          return <SeriesCard key={item.id} item={item as Series} />;
        })
      ) : (
        <div>No data</div>
      )}
    </StyledContentList>
  );
}
