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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userQueryOptions } from "@/services/auth.services";
import { LibraryContext } from "@/store/library.context";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import {
  HelpCircle as HelpIcon,
  Home as HomeIcon,
  Laptop,
  LogOut as Logout,
  Menu as MenuIcon,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useContext } from "react";

export default function Menu() {
  const location = useLocation();
  const { data } = useQuery(userQueryOptions);
  const { sortBy, updateSortBy } = useContext(LibraryContext);
  const fallback = data?.user?.given_name?.[0]?.toUpperCase();
  const { theme, setTheme } = useTheme();

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
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 my-1">
                  <AvatarImage src={data.user.picture!} />
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <p className="text-xl">{data.user.given_name}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <Link to="/" disabled={location.pathname === "/"}>
            <DropdownMenuItem className="cursor-pointer h-10">
              <HomeIcon className="w-4 h-4 mr-2" />
              <span>Home</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/about" disabled={location.pathname === "/about"}>
            <DropdownMenuItem className="cursor-pointer h-10">
              <HelpIcon className="w-4 h-4 mr-2" />
              <span>About</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        {data && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-normal text-sm text-muted-foreground select-none cursor-default">
              Sorted by
            </DropdownMenuLabel>
            <div className="px-2 pb-1.5">
              <Select value={sortBy} onValueChange={updateSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity" className="cursor-pointer">
                    Popularity
                  </SelectItem>
                  <SelectItem value="added_date" className="cursor-pointer">
                    Added Date
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-normal text-sm text-muted-foreground select-none cursor-default">
              Theme
            </DropdownMenuLabel>
            <div className="px-2 pb-1.5">
              <div className="flex items-center justify-between rounded-md border p-1">
                <Button
                  variant={theme === "system" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="w-full"
                >
                  <Laptop className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="w-full"
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="w-full"
                >
                  <Moon className="h-4 w-4" />
                </Button>
              </div>
            </div>

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
