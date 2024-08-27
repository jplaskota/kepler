import type { Movie } from "@server-models/movie.model";
import type { Series } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { getContent } from "../services/content.services";
import { CategoryContext } from "../store/category.context";
import ContentCard from "./ContentCard";
import SkeletonContent from "./SkeletonContent";

export default function ContentList() {
  const { category } = useContext(CategoryContext);
  const [cols, setCols] = useState<number>(2);

  const {
    isLoading,
    isError,
    data: content,
  } = useQuery({
    queryKey: ["get-content", category],
    queryFn: () => getContent(category),
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    const calculateCols = () => {
      const width = window.innerWidth;

      const maxCols =
        width > 1700 ? 5 : width > 1300 ? 4 : width > 1000 ? 3 : 2;

      return content && content.length < maxCols ? content.length : maxCols;
    };

    const handleResize = debounce(() => {
      setCols(calculateCols());
    }, 300); // Adjust debounce time as needed

    setCols(calculateCols());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [content]);

  return (
    <>
      {isLoading ? (
        <SkeletonContent cols={cols} />
      ) : isError ? (
        <div className="text-center text-red-500">
          Error loading content. Please try again later.
        </div>
      ) : content && content.length > 0 ? (
        <div className="scroll-smooth overflow-y-auto no-scrollbar">
          <Masonry
            className="flex gap-4 px-4"
            breakpointCols={cols}
            columnClassName="w-full"
          >
            {content.map((item: Movie | Series) => {
              if (item.media_type === "movie") {
                return <ContentCard key={item.id} item={item as Movie} />;
              }
              return <ContentCard key={item.id} item={item as Series} />;
            })}
          </Masonry>
        </div>
      ) : (
        <div className="text-center">
          No content available in this category.
        </div>
      )}
    </>
  );
}
