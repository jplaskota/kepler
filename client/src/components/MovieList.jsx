import { StyledMovieList } from "../styles/MovieList.styles";
import MovieCard from "./MovieCard";

function MovieList({ list }) {
  function Cols(list) {
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
  }

  return (
    <StyledMovieList breakpointCols={Cols(list)}>
      {list.map((item) => (
        <MovieCard key={item.id} {...item} />
      ))}
    </StyledMovieList>
  );
}

export default MovieList;

// TODO cols by window width
