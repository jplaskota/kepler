import {
  MovieOMDBSchema,
  MovieTMDBSchema,
  type TMovieSearch,
} from "../models/movie.model";
import {
  SeriesOMDBSchema,
  SeriesTMDBSchema,
  type TSeriesSearch,
} from "../models/series.model";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3",
  TMDB_API_KEY = Bun.env.TMDB_API_KEY,
  OMDB_API_BASE_URL = "http://www.omdbapi.com",
  OMDB_API_KEY = Bun.env.OMDB_API_KEY,
  TMDB_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY!,
    },
  };

export async function fetchMovieDetails(tmdbId: number) {
  const tmdbMovieData = await fetch(
    `${TMDB_API_BASE_URL}/movie/${tmdbId}`,
    TMDB_OPTIONS
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch movie details from TMDB");
    return res.json();
  });

  const parsedTMDBMovieData = MovieTMDBSchema.parse(tmdbMovieData);

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
  } as TMovieSearch;
}

export async function fetchSeriesDetails(tmdbId: number) {
  const tmdbSeriesData = await fetch(
    `${TMDB_API_BASE_URL}/tv/${tmdbId}?append_to_response=external_ids`,
    TMDB_OPTIONS
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch series details from TMDB");
    return res.json();
  });

  const parsedTMDBSeriesData = SeriesTMDBSchema.parse(tmdbSeriesData);

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
    number_of_seasons: parsedTMDBSeriesData.seasons.filter(
      (s) => s.season_number !== 0
    ).length,
    imdb_rating: imdbRating,
    rotten_tomatoes: rottenTomatoes,
    media_type: "tv",
  } as TSeriesSearch;
}
