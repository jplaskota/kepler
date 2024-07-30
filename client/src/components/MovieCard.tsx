import { type Movie } from "@server-models/movie.model";
import {
  InLine,
  Info,
  StyledContentCard,
  Title,
} from "../styles/ContentCard.styles";

interface MovieCardProps {
  item: Movie;
}

export default function MovieCard({ item }: MovieCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <StyledContentCard>
      <img src={posterUrl} alt="poster" />
      <Title>{item.title}</Title>
      <InLine>
        <Info>[ {item.release_date.split("-")[0]} ]</Info>
        <Info>[ {item.runtime} min ]</Info>
      </InLine>
      <Info>{item.genres.join(", ")}</Info>
    </StyledContentCard>
  );
}

// TODO movie page with more info
