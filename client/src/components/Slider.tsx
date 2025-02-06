import type { TActor } from "@server-models/series.model";
import { Card, CardDescription, CardTitle } from "./ui/card";

interface SliderProps {
  actors: TActor[];
}

export default function Slider({ actors }: SliderProps) {
  return (
    <div className="w-full flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
      {actors &&
        actors.map((actor) => (
          <Card className="w-64 shrink-0 snap-start first:ml-0 p-3 flex flex-col gap-3 font-Montserrat">
            {actor.profile_path ? (
              <img
                src={import.meta.env.VITE_IMAGE_BASE_URL + actor.profile_path}
                alt="poster"
                loading="lazy"
                className="rounded-md"
                crossOrigin="anonymous"
              />
            ) : (
              <div>error 404</div>
            )}
            <CardTitle>{actor.character}</CardTitle>
            <CardDescription>{actor.original_name}</CardDescription>
          </Card>
        ))}
    </div>
  );
}
