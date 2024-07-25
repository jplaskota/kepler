// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DATA, MediaItem } from "../data";
// import { api } from "../utils/api";
import Button from "./Button";
import Category from "./Category";
import MovieList from "./MovieList";

// async function getContent() {
//   const res = await api.content.$get();
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const data = await res.json();
//   return data;
// }

function App() {
  const [category, setCategory] = useState<string>("all");
  const [list, setList] = useState<MediaItem[]>(DATA);

  // const { isPending } = useQuery({
  //   queryKey: ["get-all-content"],
  //   queryFn: getContent,
  // });

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
