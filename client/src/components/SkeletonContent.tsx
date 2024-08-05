import { Skeleton } from "@/components/ui/skeleton";
import Masonry from "react-masonry-css";

export default function SkeletonContent({ cols }: { cols: number }) {
  return (
    <Masonry
      className="flex justify-center gap-4 w-screen p-4"
      breakpointCols={cols}
      columnClassName="w-full max-w-[300px]"
    >
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
      <Skeleton className="mb-4 w-full h-[70vw] max-h-[500px]" />
    </Masonry>
  );
}

// TODO: cache the content length and render the amount of content or 8 items
