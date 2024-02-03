import MovieCard from "../MovieCard/MovieCard";
import BatmanPoster from "/BatmanPoster.png";

function App() {
  return (
    <MovieCard
      title={"BATMAN"}
      img={BatmanPoster}
      date={"2022"}
      running={"176MIN"}
      director={"Matt Reeves"}
    ></MovieCard>
  );
}

export default App;
