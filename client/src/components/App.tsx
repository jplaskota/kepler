import { useState } from "react";
import Button from "./Button";
import Category from "./Category";
import ContentList from "./ContentList";

export default function App() {
  const [category, setCategory] = useState("all");

  function categoryHandler(selected: string) {
    setCategory(selected);
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
          onSelect={() => categoryHandler("tv")}
          isSelected={category === "tv"}
          label="Series"
        />
      </Category>
      <ContentList category={category} />
    </>
  );
}

// TODO add skeleton loader
// TODO add search bar
// TODO add burger menu
// TODO mui component + styled-components
