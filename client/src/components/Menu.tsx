import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userQueryOptions } from "@/services/auth.services";
import {
  QuestionMarkCircleIcon as HelpIcon,
  HomeIcon,
  ArrowLeftEndOnRectangleIcon as Logout,
  Bars3Icon as MenuIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { Separator } from "./ui/separator";

export default function Menu() {
  const location = useLocation();

  const { data } = useQuery(userQueryOptions);

  const fallback = data?.user?.given_name?.[0]?.toUpperCase();

  const profile = (
    <>
      <SheetDescription className="flex items-center gap-4 p-2">
        <Avatar className="h-16 w-16">
          {data && <AvatarImage src={data.user.picture!} />}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <SheetDescription className="text-lg">Hi</SheetDescription>
          <SheetTitle className="text-2xl font-Montserrat">
            {data?.user.given_name}
          </SheetTitle>
        </div>
      </SheetDescription>
      <Separator />
    </>
  );

  const LogoutBtn = (
    <a href="/api/logout">
      <Button variant="secondary" className="flex gap-2">
        <Logout className="w-4 h-4" />
        <p>Sign out</p>
      </Button>
    </a>
  );

  const LoginBtn = (
    <div className="flex gap-2">
      <a href="/api/login">
        <Button variant="ghost">Sign in</Button>
      </a>
      <a href="/api/register">
        <Button variant="secondary">Sign up</Button>
      </a>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MenuIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between font-thin">
        <SheetHeader>
          {data && profile}
          <SheetDescription className="flex flex-col gap-2 items-start">
            <Link
              to="/"
              disabled={location.pathname === "/"}
              className="flex items-center gap-2 hover:text-neutral-50 transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              <p className="text-xl">Home</p>
            </Link>
            <Link
              to="/about"
              disabled={location.pathname === "/about"}
              className="flex items-center gap-2 hover:text-neutral-50 transition-colors"
            >
              <HelpIcon className="w-4 h-4" />
              <p className="text-xl">About</p>
            </Link>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>{data ? LogoutBtn : LoginBtn}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
