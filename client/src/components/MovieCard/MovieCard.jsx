import { InLine, Info, StyledMovieCard, Title } from "./MovieCard.styles";

function MovieCard({ title, img, date, running, director }) {
  return (
    <StyledMovieCard>
      <img src={img} alt="poster" />
      <Title>{title}</Title>
      <InLine>
        <Info>[ {date} ]</Info>
        <Info>[ {running} ]</Info>
      </InLine>
      <Info>{director}</Info>
    </StyledMovieCard>
  );
}

export default MovieCard;
