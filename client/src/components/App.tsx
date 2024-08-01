import { useState } from "react";
import ContentList from "./ContentList";
import Navbar from "./Navbar";

export default function App() {
  const [category, setCategory] = useState("all");

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="max-sm:pr-4 max-sm:pl-4 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60:pl-4 flex flex-col items-center">
        <Navbar category={category} setCategory={setCategory} />
        <ContentList category={category}></ContentList>
      </div>
    </div>
  );
}

// TODO add skeleton loader
