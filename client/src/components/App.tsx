import { useState } from "react";
import ContentList from "./ContentList";
import Navbar from "./Navbar";

export default function App() {
  const [category, setCategory] = useState("all");

  return (
    <div className="w-100 flex justify-center">
      <div className="md:w-[80vw] max-md:p-4">
        <Navbar category={category} setCategory={setCategory} />
        <ContentList category={category}></ContentList>
      </div>
    </div>
  );
}

// TODO add skeleton loader
