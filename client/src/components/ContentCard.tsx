import { cn } from "@/lib/utils";
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

  return (
    <Card
      className={cn(
        "shrink-0 snap-start first:ml-0 font-Montserrat",
        onClick && "transition-transform cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-2 sm:p-3 space-y-2">
        {!image_path ? (
          <Skeleton className="w-full aspect-[2/3]" />
        ) : (
          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-md">
            <img
              src={posterUrl}
              alt={title}
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
        {tags && tags.length > 0 && <TagsSlider tags={tags} className="pt-1" />}
      </CardHeader>
    </Card>
  );
}
