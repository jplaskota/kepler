import { styled } from "styled-components";

const StyledMovieList = styled.div`
  height: fit-content;
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: red;
`;

function MovieList({ children }) {
  return <StyledMovieList>{children}</StyledMovieList>;
}

export default MovieList;
