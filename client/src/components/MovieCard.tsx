import {
  InLine,
  Info,
  StyledMovieCard,
  Title,
} from "../styles/MovieCard.styles";

interface MovieCardProps {
  title: string;
  img: string;
  date: string;
  running: string;
  director: string;
}

export default function MovieCard({
  title,
  img,
  date,
  running,
  director,
}: MovieCardProps) {
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
