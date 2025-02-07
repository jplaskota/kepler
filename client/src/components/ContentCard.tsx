import { Card, CardDescription, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type SliderItem = {
  title: string;
  subtitle?: string;
  image_path: string | null;
};

export default function ContentCard({
  title,
  subtitle,
  image_path,
}: SliderItem) {
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + image_path;

  return (
    <Card className="w-64 shrink-0 snap-start first:ml-0 p-3 flex flex-col gap-3 font-Montserrat">
      {image_path ? (
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="rounded-md aspect-[2/3] object-cover"
          crossOrigin="anonymous"
        />
      ) : (
        <Skeleton className="w-full aspect-[2/3]" />
      )}
      <CardTitle>{title}</CardTitle>
      {subtitle && <CardDescription>{subtitle}</CardDescription>}
    </Card>
  );
}
