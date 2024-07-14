import type { Movie } from "./models/movie.model";
import type { Series } from "./models/series.model";

export const fakeMovies: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    runtime: 169,
    release_date: "2014-11-05",
    genres: ["Action", "Adventure", "Sci-Fi"],
    overview:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    homepage: "http://www.interstellarmovie.net/",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    popularity: 140.854,
    status: "Released",
    vote_average: 8.4,
    media_type: "movie",
  },
  {
    id: "2",
    title: "The Batman",
    runtime: 177,
    release_date: "2022-03-01",
    genres: ["Crime", "Mystery", "Thriller"],
    overview:
      "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    homepage: "https://www.thebatman.com",
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    popularity: 125.344,
    status: "Released",
    vote_average: 7.678,
    media_type: "movie",
  },
  {
    id: "3",
    title: "Pulp Fiction",
    runtime: 154,
    release_date: "1994-09-10",
    genres: ["Thriller", "Crime"],
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    homepage: "https://www.miramax.com/movie/pulp-fiction/",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    popularity: 112.584,
    status: "Released",
    vote_average: 8.488,
    media_type: "movie",
  },
];

export const fakeSeries: Series[] = [];
