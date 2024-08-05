import { useState } from "react";
import ContentList from "./ContentList";
import Navbar from "./Navbar";

export default function App() {
  const [category, setCategory] = useState("all");

  return (
    <div className="fixed w-dvw h-dvh flex flex-col items-center bg-background overflow-hidden">
      <Navbar category={category} setCategory={setCategory} />
      <ContentList category={category}></ContentList>
    </div>
  );
}
