// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DATA, MediaItem } from "../data";
// import { api } from "../utils/api";
import Button from "./Button";
import Category from "./Category";
import MovieList from "./MovieList";

// async function getContent() {
//   const data = await api.content
//     .$get()
//     .then((res) => {
//       if (res.ok) throw new Error("Failed to fetch data");
//       return res;
//     })
//     .then((res) => res.json());

//   return data;
// }

export default function App() {
  const [category, setCategory] = useState<string>("all");
  const [list, setList] = useState<MediaItem[]>(DATA);

  // const { isPending, error } = useQuery({
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
        {/* <Button
          onSelect={() => categoryHandler("test")}
          isSelected={category === "test"}
          label={isPending ? "..." : error ? "Error" : "test"}
        /> */}
      </Category>
      <MovieList list={list} />
    </>
  );
}

// TODO add skeleton loader
// TODO add search bar
// TODO add burger menu
// TODO mui component + styled-components
