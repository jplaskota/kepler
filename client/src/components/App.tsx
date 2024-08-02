import { useState } from "react";
import ContentList from "./ContentList";
import Navbar from "./Navbar";

export default function App() {
  const [category, setCategory] = useState("all");

  return (
    <div className="w-100 px-4 flex flex-col items-center min-h-screen bg-background">
      <Navbar category={category} setCategory={setCategory} />
      <ContentList category={category}></ContentList>
    </div>
  );
}

// TODO add skeleton loader
