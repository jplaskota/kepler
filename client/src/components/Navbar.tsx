import { Separator } from "@/components/ui/separator";
import { useScroll } from "@/hooks/useScroll";
import { userQueryOptions } from "@/services/auth.services";
import { cn } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import logo_dark from "../assets/logo_dark.png";
import logo_light from "../assets/logo_light.png";
import CategoryBar from "./CategoryBar";
import Menu from "./Menu";
import { Search } from "./Search/Search";
import { Button } from "./ui/button";

export default function Navbar() {
  const location = useLocation();
  const { data } = useQuery(userQueryOptions);
  const { navbarVisible, navbarTop } = useScroll();

  return (
    <div className="w-full h-[52px] sm:h-[70px] flex justify-center">
      <nav
        className={cn(
          !navbarTop &&
            (navbarVisible
              ? "fixed top-0 transition-all duration-300"
              : "fixed -top-[52px] sm:-top-[70px] transition-all duration-300"),
          "w-full bg-gradient-to-t from-background/80 to-background backdrop-blur-md"
        )}
      >
        <div className="flex justify-between w-full sm:max-w-[1600px] p-2 sm:p-4 items-center">
          <div className="flex h-5 items-center gap-2.5 sm:gap-3">
            <Link
              to="/"
              className="flex gap-2 items-center"
              disabled={location.pathname === "/"}
            >
              <img
                src={logo_dark}
                alt="logo"
                className="h-6 hidden dark:block"
              />
              <img
                src={logo_light}
                alt="logo"
                className="h-6 block dark:hidden"
              />
              <p className="hidden sm:block text-xl select-none">Kepler</p>
            </Link>
            {location.pathname === "/" && data && (
              <>
                <Separator orientation="vertical" />
                <CategoryBar />
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {data ? (
              <>
                <Search />
                <Menu />
              </>
            ) : (
              <div className="flex gap-2">
                <a href="/api/login">
                  <Button variant="ghost">Sign in</Button>
                </a>
                <a href="/api/register">
                  <Button variant="secondary">Sign up</Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
