import { debounce } from "lodash";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useLibrary } from "../hooks/useLibrary";
import ContentCard from "./ContentCard";
import SkeletonContent from "./SkeletonContent";

export default function ContentList() {
  const [cols, setCols] = useState<number>(2);
  const { library, isLoading, isError } = useLibrary();

  useEffect(() => {
    const calculateCols = () => {
      const width = window.innerWidth;
      const length = library.length;
      const maxCols =
        width > 1700 ? 5 : width > 1300 ? 4 : width > 1000 ? 3 : 2;
      return length < maxCols ? length : maxCols;
    };

    const handleResize = debounce(() => {
      setCols(calculateCols());
    }, 300);

    setCols(calculateCols());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [library.length]);

  return (
    <>
      {isLoading ? (
        <SkeletonContent cols={cols} />
      ) : isError ? (
        <div className="text-center text-red-500">
          Error loading content. Please try again later.
        </div>
      ) : library.length > 0 ? (
        <div className="scroll-smooth overflow-y-auto no-scrollbar">
          <Masonry
            className="flex gap-4 px-4"
            breakpointCols={cols}
            columnClassName="w-full"
          >
            {library.map((item) => (
              <ContentCard key={item._id} item={item} />
            ))}
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
