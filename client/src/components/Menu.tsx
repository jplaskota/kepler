import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userQueryOptions } from "@/services/auth.services";
import {
  QuestionMarkCircleIcon as HelpIcon,
  HomeIcon,
  ArrowLeftEndOnRectangleIcon as Logout,
  Bars3Icon as MenuIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";

export default function Menu() {
  const location = useLocation();
  const { data } = useQuery(userQueryOptions);
  const fallback = data?.user?.given_name?.[0]?.toUpperCase();

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="end">
        {data && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={data.user.picture!} />
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <p className="text-lg">{data.user.given_name}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <Link to="/" disabled={location.pathname === "/"}>
            <DropdownMenuItem className="cursor-pointer">
              <HomeIcon className="w-4 h-4 mr-2" />
              <span>Home</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/about" disabled={location.pathname === "/about"}>
            <DropdownMenuItem className="cursor-pointer">
              <HelpIcon className="w-4 h-4 mr-2" />
              <span>About</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        {data && (
          <>
            <DropdownMenuSeparator />
            <a href="/api/logout">
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                <Logout className="w-4 h-4 mr-2" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </a>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
