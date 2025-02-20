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
import { useLibraryContext } from "@/store/library.context";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { t } from "i18next";
import {
  HelpCircle as HelpIcon,
  Home as HomeIcon,
  LogOut as Logout,
  Menu as MenuIcon,
} from "lucide-react";

export default function Menu() {
  const location = useLocation();
  const { data } = useQuery(userQueryOptions);
  const { sortBy, updateSortBy } = useLibraryContext();
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
              <Link to="/user" disabled={location.pathname === "/user"}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 my-1 select-none">
                    <AvatarImage src={data.user.picture!} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                  <p className="text-xl select-none">{data.user.given_name}</p>
                </div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <Link to="/" disabled={location.pathname === "/"}>
            <DropdownMenuItem className="cursor-pointer h-10">
              <HomeIcon className="w-4 h-4 mr-2" />
              <span>{t("menu.home")}</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/about" disabled={location.pathname === "/about"}>
            <DropdownMenuItem className="cursor-pointer h-10">
              <HelpIcon className="w-4 h-4 mr-2" />
              <span>{t("menu.about")}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        {data && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-normal text-sm text-muted-foreground select-none cursor-default">
              {t("menu.sorting")}
            </DropdownMenuLabel>
            <div className="px-2 pb-1.5">
              <Select value={sortBy} onValueChange={updateSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="added_date" className="cursor-pointer">
                    {t("menu.sortedBy.addedDate")}
                  </SelectItem>
                  <SelectItem value="popularity" className="cursor-pointer">
                    {t("menu.sortedBy.popularity")}
                  </SelectItem>
                  <SelectItem value="rating" className="cursor-pointer">
                    {t("menu.sortedBy.rating")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DropdownMenuSeparator />
            <a href="/api/logout">
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                <Logout className="w-4 h-4 mr-2" />
                <span>{t("menu.signOut")}</span>
              </DropdownMenuItem>
            </a>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
