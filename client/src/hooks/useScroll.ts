import { useEffect, useState } from "react";

export function useScroll() {
  const [prevScroll, setPrevScroll] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [navbarTop, setNavbarTop] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = Math.abs(currentScroll - prevScroll);
      const scrollSpeed = scrollDiff / timeDiff;

      const speedThreshold = 0.5;

      if (currentScroll > 60) {
        setNavbarTop(false);
        if (scrollSpeed > speedThreshold) {
          if (prevScroll > currentScroll) {
            setNavbarVisible(true);
          } else {
            setNavbarVisible(false);
          }
        }
      } else {
        if (!navbarVisible) setNavbarTop(true);
      }

      if (currentScroll === 0) {
        setNavbarTop(true);
        setNavbarVisible(false);
      }

      setPrevScroll(currentScroll);
      setLastScrollTime(currentTime);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll, lastScrollTime, navbarVisible]);

  return { navbarVisible, navbarTop };
}
