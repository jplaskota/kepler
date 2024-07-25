// import { type ApiRoutes } from "@server-rpc";
// import { hc } from "hono/client";
import { useState } from "react";
import { DATA, MediaItem } from "../data";
import Button from "./Button";
import Category from "./Category";
import MovieList from "./MovieList";

// const client = hc<ApiRoutes>("/");


function App() {
  const [category, setCategory] = useState<string>("all");
  const [list, setList] = useState<MediaItem[]>(DATA);

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
