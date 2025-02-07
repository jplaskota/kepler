import ContentCard from "./ContentCard";

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
        <ContentCard
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          image_path={item.image_path}
        />
      ))}
    </div>
  );
}
