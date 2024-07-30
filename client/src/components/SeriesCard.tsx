import { type Series } from "@server-models/series.model";
import {
  InLine,
  Info,
  StyledContentCard,
  Title,
} from "../styles/ContentCard.styles";

interface SeriesCardProps {
  item: Series;
}

export default function SeriesCard({ item }: SeriesCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <StyledContentCard>
      <img src={posterUrl} alt="poster" />
      <Title>{item.title}</Title>
      <InLine>
        <Info>[ {item.first_air_date.split("-")[0]} ]</Info>
        <Info>[ {item.number_of_seasons} seasons ]</Info>
      </InLine>
      <Info>{item.genres.join(", ")}</Info>
    </StyledContentCard>
  );
}

// TODO series page with more info
