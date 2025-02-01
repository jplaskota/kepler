import { useEffect, useState } from "react";

export function useScroll() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);

      if (currentScroll > prevScroll && currentScroll > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return { scrollDirection, scrollPosition };
}
