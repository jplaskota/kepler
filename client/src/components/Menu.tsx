import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { FiMenu } from "react-icons/fi";

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <FiMenu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription className="flex flex-col gap-2 items-start">
            <Link to="/about">About</Link>
            <Link to="/movie/$id" params={{ id: "475557" }}>
              Test movie
            </Link>
            <Link to="/series/$id" params={{ id: "76479" }}>
              Test series
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
