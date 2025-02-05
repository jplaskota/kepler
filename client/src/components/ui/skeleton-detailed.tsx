import { Card } from "./card";
import { Skeleton } from "./skeleton";

export function DetailedPageSkeleton() {
  return (
    <Card className="flex md:max-w-[1200px] max-md:flex-col gap-4 p-3">
      <Skeleton className="h-[600px] aspect-[8/12]" />
      <div className="flex flex-col-reverse md:flex-col justify-between items-end gap-8">
        <Skeleton className="h-10 w-10" />
        <article className="flex flex-col gap-3">
          <Skeleton className="h-28 w-full sm:w-2/3" />
          <Skeleton className="h-8 w-full sm:w-1/3" />
          <Skeleton className="flex flex-wrap gap-1 max-w-fit">
            <p className="h-8 w-52" />
            <p className="h-8 w-52" />
            <p className="h-8 w-52" />
            <p className="h-8 w-52" />
          </Skeleton>
          <Skeleton className="h-8 w-full sm:w-1/3" />
        </article>
      </div>
    </Card>
  );
}
