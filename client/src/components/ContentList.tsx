import { type Movie } from "@server-models/movie.model";
import { type Series } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
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
    <div className="scroll-smooth overflow-y-auto no-scrollbar">
      <Masonry
        className="flex gap-4 px-4"
        breakpointCols={cols}
        columnClassName="w-full"
      >
        {content.map((item: Movie | Series) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </Masonry>
    </div>
  ) : (
    <div>No data</div>
  );
}

// TODO del masonry layout
