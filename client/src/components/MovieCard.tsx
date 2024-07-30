import { type Movie } from "@server-models/movie.model";

interface MovieCardProps {
  item: Movie;
}

export default function MovieCard({ item }: MovieCardProps) {
  const posterUrl = "https://image.tmdb.org/t/p/original" + item.poster_path;

  return (
    <div>
      <img src={posterUrl} alt="poster" />
      <h1>{item.title}</h1>
      <div>
        <p>[ {item.release_date.split("-")[0]} ]</p>
        <p>[ {item.runtime} min ]</p>
      </div>
      <p>{item.genres.join(", ")}</p>
    </div>
  );
}

// TODO movie page with more info
