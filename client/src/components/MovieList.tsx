import { useEffect, useState } from "react";
import { MediaItem } from "../data";
import { StyledMovieList } from "../styles/MovieList.styles";
import MovieCard from "./MovieCard";

interface MovieListProps {
  list: MediaItem[];
}

export default function MovieList({ list }: MovieListProps) {
  const [cols, setCols] = useState<number>(2);

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

      if (list.length >= maxCols) {
        return maxCols;
      }
      return list.length;
    };

    const handleResize = () => {
      setCols(calculateCols());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [list.length]);

  return (
    <StyledMovieList className="movie-list" breakpointCols={cols}>
      {list.map((item) => (
        <MovieCard key={item.id} {...item} />
      ))}
    </StyledMovieList>
  );
}
