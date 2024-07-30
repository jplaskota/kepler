import { type Series } from "@server-models/series.model";

interface SeriesCardProps {
  item: Series;
}

export default function SeriesCard({ item }: SeriesCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <div>
      <img src={posterUrl} alt="poster" />
      <h1>{item.title}</h1>
      <div>
        <p>[ {item.first_air_date.split("-")[0]} ]</p>
        <p>[ {item.number_of_seasons} seasons ]</p>
      </div>
      <p>{item.genres.join(", ")}</p>
    </div>
  );
}

// TODO series page with more info
