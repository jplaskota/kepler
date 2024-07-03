import CategorySlider from "../CategorySelector/CategorySelector";
import MovieCard from "../MovieCard/MovieCard";
import MovieList from "../MovieList/MovieList";
import BatmanPoster from "/BatmanPoster.jpg";
import BohemianPoster from "/BohemianPoster.jpg";
import JokerPoster from "/JokerPoster.jpg";
import TLOUPoster from "/TLOUPoster.jpg";

function App() {
  return (
    <>
      <CategorySlider />
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
        <MovieCard
          title={"THE LAST OF US"}
          img={TLOUPoster}
          date={"2023"}
          running={"season 1"}
          director={"Neil Druckmann, Craig Mazin"}
        ></MovieCard>
        <MovieCard
          title={"JOKER"}
          img={JokerPoster}
          date={"2019"}
          running={"122MIN"}
          director={"Todd Phillips"}
        ></MovieCard>
      </MovieList>
    </>
  );
}

export default App;
