import { cn } from "@/lib/utils";
import { useLanguage } from "@/store/language.context";
import { usePreferencesContext } from "@/store/preferences.context";
import TagsSlider from "./TagsSlider";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface ContentCardProps {
  title: string;
  subtitle?: string;
  image_path: string | null;
  additionalInfo?: string[];
  tags?: string[];
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}

export default function ContentCard({
  title,
  subtitle,
  image_path,
  additionalInfo,
  tags,
  className,
  imageClassName,
  onClick,
}: ContentCardProps) {
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + image_path;
  const { t } = useLanguage();
  const { minimalCardView: minimalCardView } = usePreferencesContext();

  return (
    <Card
      className={cn(
        "shrink-0 snap-start first:ml-0 font-Montserrat relative group",
        onClick && "transition-transform cursor-pointer",
        minimalCardView && "overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      {minimalCardView ? (
        <>
          {!image_path ? (
            <Skeleton className="w-full aspect-[2/3]" />
          ) : (
            <>
              <div className="w-full aspect-[2/3] overflow-hidden">
                <img
                  src={posterUrl}
                  alt={t("content.poster")}
                  loading="lazy"
                  className={cn("w-full h-full object-cover", imageClassName)}
                  crossOrigin="anonymous"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <CardTitle className="font-Anton text-lg sm:text-2xl truncate text-white drop-shadow-md">
                  {title.toUpperCase()}
                </CardTitle>
                {subtitle && (
                  <CardDescription className="text-sm truncate text-gray-300">
                    {subtitle}
                  </CardDescription>
                )}
                {additionalInfo && additionalInfo.length > 0 && (
                  <div className="flex gap-1.5 text-sm text-gray-400">
                    {additionalInfo.map((info, index) => (
                      <div key={index}>
                        <span key={index} className="max-sm:text-xs">
                          {info}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {tags && tags.length > 0 && (
                  <TagsSlider tags={tags} className="pt-1" />
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <CardHeader className="p-2 sm:p-3 space-y-2">
          {!image_path ? (
            <Skeleton className="w-full aspect-[2/3]" />
          ) : (
            <div className="w-full aspect-[2/3] overflow-hidden rounded-md">
              <img
                src={posterUrl}
                alt={t("content.poster")}
                loading="lazy"
                className={cn("w-full h-full object-cover", imageClassName)}
                crossOrigin="anonymous"
              />
            </div>
          )}
          <CardTitle className="font-Anton text-lg sm:text-2xl truncate">
            {title.toUpperCase()}
          </CardTitle>
          {subtitle && (
            <CardDescription className="text-sm truncate">
              {subtitle}
            </CardDescription>
          )}
          {additionalInfo && additionalInfo.length > 0 && (
            <div className="flex gap-1.5 text-sm text-muted-foreground">
              {additionalInfo.map((info, index) => (
                <div key={index}>
                  <span key={index} className="max-sm:text-xs">
                    {info}
                  </span>
                </div>
              ))}
            </div>
          )}
          {tags && tags.length > 0 && (
            <TagsSlider tags={tags} className="pt-1" />
          )}
        </CardHeader>
      )}
    </Card>
  );
}
