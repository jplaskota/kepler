import { cn } from "@/utils/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";

interface CategoryProps {
  category: string;
  setCategory: (cat: string) => void;
}

export default function Category({ setCategory, category }: CategoryProps) {
  const handleClick = (cat: string) => {
    setCategory(cat);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-2 sm:gap-3 font-Montserrat text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => handleClick("all")}
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
            onClick={() => handleClick("movie")}
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
            onClick={() => handleClick("tv")}
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
