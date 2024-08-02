import logo_dark from "../assets/logo_dark.png";
import logo_light from "../assets/logo_light.png";
import CategoryBar from "./CategoryBar";
import Menu from "./Menu";
import { Search } from "./Search";
import { Separator } from "./ui/separator";

interface NavbarProps {
  category: string;
  setCategory: (cat: string) => void;
}

export default function Navbar({ category, setCategory }: NavbarProps) {
  return (
    <nav className="flex justify-between w-full sm:w-[] sm:max-w-[1600px] py-2 sticky top-0 bg-background items-center">
      <div className="flex h-5 items-center gap-2 sm:gap-3">
        <div className="flex gap-2 items-center">
          <img src={logo_dark} alt="logo" className="h-6 hidden dark:block" />
          <img src={logo_light} alt="logo" className="h-6 block dark:hidden" />
          <p className="hidden sm:block text-xl select-none">Kepler</p>
        </div>
        <Separator orientation="vertical" />
        <CategoryBar category={category} setCategory={setCategory} />
      </div>
      <div className="flex items-center gap-2">
        <Search />
        <Menu />
      </div>
    </nav>
  );
}
