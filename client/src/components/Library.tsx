import { useLibrary } from "../hooks/useLibrary";
import LibraryCard from "./LibraryCard";
import { Skeleton } from "./ui/skeleton";

export default function Library() {
  const { library, isLoading, isEmpty } = useLibrary();

  if (isEmpty) {
    return (
      <div className="text-center p-4">
        <p>No media saved yet. Start adding your favorite movies and series!</p>
      </div>
    );
  }

  return (
    <div className="scroll-smooth overflow-y-auto no-scrollbar">
      <div className="flex flex-wrap justify-center gap-4 max-w-[1600px]">
        {isLoading ? (
          <>
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
            <Skeleton className="w-[300px] h-[500px]" />
          </>
        ) : (
          library.map((item) => <LibraryCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}

// TODO cache library length for skeleton loading
