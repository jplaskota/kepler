import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} className="w-20 select-none">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 pt-5">
          <Button>Delete Account</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
