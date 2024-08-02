import { Skeleton } from "@/components/ui/skeleton";
import Masonry from "react-masonry-css";

export default function SkeletonContent({ cols }: { cols: number }) {
  return (
    <Masonry
      className="flex gap-4 w-fit"
      breakpointCols={cols}
      columnClassName="w-full"
    >
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[80vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[83vw] max-h-[550px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[84vw] max-h-[520px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[81vw] max-h-[570px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[80vw] max-h-[530px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[87vw] max-h-[530px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[89vw] max-h-[550px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[82vw] max-h-[510px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[82vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full sm:w-[300px] max-w-[300px] h-[82vw] max-h-[500px]" />
    </Masonry>
  );
}

// TODO: cache the content length and render the amount of content or 8 items
