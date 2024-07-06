import { StyledMovieList } from "../styles/MovieList.styles";
import MovieCard from "./MovieCard";

function MovieList({ list }) {
  function Cols(list) {
    if (list.length >= 5) {
      return 5;
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
