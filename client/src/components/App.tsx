import { useState } from "react";
import { DATA, MediaItem } from "../data";
// import useFetch from "../hooks/useFetch";
import Button from "./Button";
import Category from "./Category";
import MovieList from "./MovieList";

function App() {
  const [category, setCategory] = useState<string>("all");
  const [list, setList] = useState<MediaItem[]>(DATA);
  // const { data, loading, error } = useFetch<[]>("/api/content/1");

  function categoryHandler(selected: string) {
    setCategory(selected);

    if (selected !== "all") {
      setList(DATA.filter((item) => item.type === selected));
      return;
    }

    setList(DATA);
  }

  return (
    <>
      {/* <div>{data?.content.title}</div> */}
      {/* <div>{loading ? "Loading..." : error}</div> */}
      <Category>
        <Button
          onSelect={() => categoryHandler("all")}
          isSelected={category === "all"}
          label="All"
        />
        <Button
          onSelect={() => categoryHandler("movie")}
          isSelected={category === "movie"}
          label="Movies"
        />
        <Button
          onSelect={() => categoryHandler("series")}
          isSelected={category === "series"}
          label="Series"
        />
      </Category>
      <MovieList list={list} />
    </>
  );
}

export default App;
