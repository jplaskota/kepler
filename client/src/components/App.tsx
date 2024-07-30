import { useState } from "react";
import Category from "./Category";
import ContentList from "./ContentList";
import { Button } from "./ui/button";

export default function App() {
  const [category, setCategory] = useState("all");

  const handleClick = (cat: string) => {
    setCategory(cat);
  };
  return (
    <div className="w-100 flex justify-center">
      <div className="w-[80vw] ">
        <nav className="w-100 flex justify-between">
          <div className="flex gap-2">Kepler</div>
          <Category category={category} onSelect={handleClick} />
          <Button>Menu</Button>
        </nav>
        <ContentList category={category}></ContentList>
      </div>
    </div>
  );
}

// TODO add skeleton loader
// TODO add search bar
// TODO add burger menu
// TODO mui component + styled-components
