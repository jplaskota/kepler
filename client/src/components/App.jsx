import { useState } from "react";
import { DATA } from "../data";
import Button from "./Button";
import Category from "./Category";
import MovieList from "./MovieList";

function App() {
  const [category, setCategory] = useState("All");
  const [list, setList] = useState(DATA);

  function categoryHandler(selected) {
    setCategory(selected);

    if (selected !== "all") {
      setList(DATA.filter((item) => item.type === selected));
      return;
    }

    setList(DATA);
  }

  return (
    <>
      <Category>
        <Button onSelect={() => categoryHandler("all")} label="All" />
        <Button onSelect={() => categoryHandler("movie")} label="Movies" />
        <Button onSelect={() => categoryHandler("series")} label="Series" />
      </Category>
      <MovieList list={list} />
    </>
  );
}

export default App;
