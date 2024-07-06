import { DATA } from "../../data";
import CategorySlider from "../CategorySelector/CategorySelector";
import MovieCard from "../MovieCard/MovieCard";
import MovieList from "../MovieList/MovieList";

function App() {
  return (
    <>
      <CategorySlider>
        <span>All</span>
        <span>Film</span>
        <span>Series</span>
      </CategorySlider>
      <MovieList>
        {DATA.map((item) => (
          <MovieCard key={item.id} {...item} />
        ))}
      </MovieList>
    </>
  );
}

export default App;
