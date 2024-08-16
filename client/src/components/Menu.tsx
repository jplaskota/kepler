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
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { FiHelpCircle, FiHome, FiLogOut, FiMenu } from "react-icons/fi";
import { Separator } from "./ui/separator";

export default function Menu() {
  const location = useLocation();

  const { data } = useQuery(userQueryOptions);

  const fallback =
    data &&
    data?.user.given_name[0].toUpperCase() +
      data?.user.family_name[0].toUpperCase();

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
        <FiLogOut />
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
          <FiMenu />
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
              <FiHome />
              <p className="text-xl">Home</p>
            </Link>
            <Link
              to="/about"
              disabled={location.pathname === "/about"}
              className="flex items-center gap-2 hover:text-neutral-50 transition-colors"
            >
              <FiHelpCircle />
              <p className="text-xl">About</p>
            </Link>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>{data ? LogoutBtn : LoginBtn}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
