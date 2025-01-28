import {
  MovieActorSchema,
  MovieOMDBSchema,
  MovieTMDBSchema,
  type TMovieSearch,
} from "../models/movie.model";
import {
  SeriesActorSchema,
  SeriesOMDBSchema,
  SeriesTMDBSchema,
  type TSeriesSearch,
} from "../models/series.model";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = Bun.env.TMDB_API_KEY;
const OMDB_API_BASE_URL = "http://www.omdbapi.com";
const OMDB_API_KEY = Bun.env.OMDB_API_KEY;

export async function fetchSeriesDetails(tmdbId: number) {
  const [tmdbSeriesData, tmdbActorsData] = await Promise.all([
    fetch(
      `${TMDB_API_BASE_URL}/tv/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`
    ).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch series details from TMDB");
      return res.json();
    }),
    fetch(
      `${TMDB_API_BASE_URL}/tv/${tmdbId}/credits?api_key=${TMDB_API_KEY}`
    ).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch series actors from TMDB");
      return res.json();
    }),
  ]);

  const parsedTMDBSeriesData = SeriesTMDBSchema.parse(tmdbSeriesData);
  const parsedActorsData = SeriesActorSchema.array().parse(tmdbActorsData.cast);

  const omdbSeriesData = await fetch(
    `${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&i=${parsedTMDBSeriesData.external_ids.imdb_id}`
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch details from OMDB");
    return res.json();
  });

  const parsedOMDBSeriesData = SeriesOMDBSchema.parse(omdbSeriesData);

  const imdbRating = parsedOMDBSeriesData.Ratings.find(
    (r) => r.Source === "Internet Movie Database"
  )?.Value.replace("/10", "");

  const rottenTomatoes = parsedOMDBSeriesData.Ratings.find(
    (r) => r.Source === "Rotten Tomatoes"
  )?.Value;

  const { external_ids, id, ...restTMDBSeriesData } = parsedTMDBSeriesData;

  return {
    ...restTMDBSeriesData,
    tmdb_id: id,
    genres: parsedTMDBSeriesData.genres.map((g) => g.name),
    created_by: parsedTMDBSeriesData.created_by.map((c) => c.name),
    rated: parsedOMDBSeriesData.Rated,
    seasons: parsedTMDBSeriesData.seasons.filter((s) => s.season_number !== 0),
    imdb_rating: imdbRating,
    rotten_tomatoes: rottenTomatoes,
    media_type: "tv",
    actors: parsedActorsData.slice(0, 10),
  } as TSeriesSearch;
}

export async function fetchMovieDetails(tmdbId: number) {
  const [tmdbMovieData, tmdbActorsData] = await Promise.all([
    fetch(`${TMDB_API_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`).then(
      (res) => {
        if (!res.ok) throw new Error("Failed to fetch movie details from TMDB");
        return res.json();
      }
    ),
    fetch(
      `${TMDB_API_BASE_URL}/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`
    ).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch movie actors from TMDB");
      return res.json();
    }),
  ]);

  const parsedTMDBMovieData = MovieTMDBSchema.parse(tmdbMovieData);
  const parsedActorsData = MovieActorSchema.array().parse(tmdbActorsData.cast);

  const omdbMovieData = await fetch(
    `${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&i=${parsedTMDBMovieData.imdb_id}`
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch details from OMDB");
    return res.json();
  });

  const parsedOMDBMovieData = MovieOMDBSchema.parse(omdbMovieData);

  const imdbRating = parsedOMDBMovieData.Ratings.find(
    (r) => r.Source === "Internet Movie Database"
  )?.Value.replace("/10", "");

  const rottenTomatoes = parsedOMDBMovieData.Ratings.find(
    (r) => r.Source === "Rotten Tomatoes"
  )?.Value;

  const { imdb_id, id, ...restTMDBMovieData } = parsedTMDBMovieData;

  return {
    ...restTMDBMovieData,
    tmdb_id: id,
    genres: restTMDBMovieData.genres.map((g) => g.name),
    director: parsedOMDBMovieData.Director,
    rated: parsedOMDBMovieData.Rated,
    imdb_rating: imdbRating,
    rotten_tomatoes: rottenTomatoes,
    media_type: "movie",
    actors: parsedActorsData.slice(0, 10),
  } as TMovieSearch;
}
