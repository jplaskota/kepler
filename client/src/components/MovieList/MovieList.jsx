import { StyledMovieList } from "./MovieList.styles.jsx";

function MovieList({ children }) {
  return <StyledMovieList breakpointCols={4}>{children}</StyledMovieList>;
}

export default MovieList;
