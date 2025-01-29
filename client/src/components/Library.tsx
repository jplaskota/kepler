import { debounce } from "lodash";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useLibrary } from "../hooks/useLibrary";
import LibraryCard from "./LibraryCard";
import SkeletonLibrary from "./ui/skeleton-library";

export default function Library() {
  const [cols, setCols] = useState<number>(2);
  const { library, isLoading, isEmpty } = useLibrary();

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

  if (isLoading) {
    return <SkeletonLibrary cols={cols} />;
  }

  if (isEmpty) {
    return (
      <div className="text-center p-4">
        <p>
          No media saved yet. Start adding your favorite movies and series!
        </p>
      </div>
    );
  }

  return (
    <div className="scroll-smooth overflow-y-auto no-scrollbar">
      <Masonry
        className="flex gap-4 px-4"
        breakpointCols={cols}
        columnClassName="w-full"
      >
        {library.map((item) => (
          <LibraryCard key={item._id} item={item} />
        ))}
      </Masonry>
    </div>
  );
}
