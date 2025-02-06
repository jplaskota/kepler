import { Card, CardDescription, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type SliderItem = {
  id: number;
  title: string;
  subtitle?: string;
  image_path: string | null;
};

interface SliderProps {
  items: SliderItem[];
}

export default function Slider({ items }: SliderProps) {
  return (
    <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
      {items?.map((item) => (
        <Card
          key={item.id}
          className="w-64 shrink-0 snap-start first:ml-0 p-3 flex flex-col gap-3 font-Montserrat"
        >
          {item.image_path ? (
            <img
              src={import.meta.env.VITE_IMAGE_BASE_URL + item.image_path}
              alt={item.title}
              loading="lazy"
              className="rounded-md aspect-[2/3] object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <Skeleton className="w-full aspect-[2/3]" />
          )}
          <CardTitle>{item.title}</CardTitle>
          {item.subtitle && <CardDescription>{item.subtitle}</CardDescription>}
        </Card>
      ))}
    </div>
  );
}
