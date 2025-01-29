import { Card } from "./card";
import { Skeleton } from "./skeleton";

export function DetailedPageSkeleton() {
  return (
    <div className="animate-fade-in">
      <Card className="flex md:max-w-[1200px] max-md:flex-col gap-4 p-3 mx-4 mb-4">
        <Skeleton className="md:max-h-[600px] aspect-[8/12] w-full rounded-md" />
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-16 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}
