import { Card } from "./ui/card";

export default function Slider() {
  return (
    <div className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory">
      <div className="flex gap-4 pb-4 pl-4">
        <Card className="h-56 w-36 shrink-0 snap-start first:ml-0" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
        <Card className="h-56 w-36 shrink-0 snap-start" />
      </div>
    </div>
  );
}
