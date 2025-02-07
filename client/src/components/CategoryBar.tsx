import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { LibraryContext } from "@/store/library.context";
import { cn } from "@/lib/utils";
import { useContext } from "react";

export default function CategoryBer() {
  const { category, updateCategory } = useContext(LibraryContext);

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-2 sm:gap-4 font-Montserrat text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => updateCategory("all")}
            className={cn(
              category === "all" && "text-primary",
              "cursor-pointer select-none"
            )}
          >
            All
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => updateCategory("movie")}
            className={cn(
              category === "movie" && "text-primary",
              "cursor-pointer select-none"
            )}
          >
            Movies
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => updateCategory("tv")}
            className={cn(
              category === "tv" && "text-primary",
              "cursor-pointer select-none"
            )}
          >
            Series
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// TODO sorted by popularity and recently added
