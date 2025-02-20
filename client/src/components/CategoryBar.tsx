import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/store/language.context";
import { useLibraryContext } from "@/store/library.context";

export default function CategoryBer() {
  const { category, updateCategory } = useLibraryContext();
  const { t } = useLanguage();

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
            {t("categories.all")}
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
            {t("categories.movies")}
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
            {t("categories.series")}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// TODO sorted by popularity and recently added
