import MovieCard from "../Movie/MovieCard";
import MovieList from "../Movie/MovieList";
import BatmanPoster from "/BatmanPoster.png";
import BohemianPoster from "/BohemianPoster.png";

function App() {
  return (
    <MovieList>
      <MovieCard
        title={"BATMAN"}
        img={BatmanPoster}
        date={"2022"}
        running={"176MIN"}
        director={"Matt Reeves"}
      ></MovieCard>
      <MovieCard
        title={"BOHEMIAN RHAPSODY"}
        img={BohemianPoster}
        date={"2018"}
        running={"134MIN"}
        director={"Bryan Singer, Dexter Fletcher"}
      ></MovieCard>
    </MovieList>
  );
}

export default App;
