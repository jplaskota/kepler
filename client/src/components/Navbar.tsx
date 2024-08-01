import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import CategoryBar from "./CategoryBar";
import Menu from "./Menu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface NavbarProps {
  category: string;
  setCategory: (cat: string) => void;
}

export default function Navbar({ category, setCategory }: NavbarProps) {
  return (
    <nav className="container justify-between sm:pl-10 sm:pr-10 flex h-14 items-center">
      <div className="flex h-5 items-center gap-2.5 sm:gap-4">
        <p className="text-xl select-none">Kepler</p>
        <Separator orientation="vertical" />
        <CategoryBar category={category} setCategory={setCategory} />
      </div>
      <div className="flex items-center gap-3">
        <Button variant={"outline"}>
          <MagnifyingGlassIcon />
        </Button>
        <Menu />
      </div>
    </nav>
  );
}
