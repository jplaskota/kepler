import type { TMovieCard } from "@server-models/movie.model";
import type { TSeriesCard } from "@server-models/series.model";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { useEffect } from "react";
import { useLibrary } from "../hooks/useLibrary";
import ContentCard from "./ContentCard";
import { Skeleton } from "./ui/skeleton";

export default function Library() {
  const { library, isLoading, isEmpty, cachedSize } = useLibrary();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [library]);

  if (isEmpty) {
    return (
      <div className="text-center p-4">
        <p>No media saved yet. Start adding your favorite movies and series!</p>
      </div>
    );
  }

  return (
    <div className="scroll-smooth overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-2 sm:flex flex-wrap justify-center px-2 sm:px-4 pb-2 sm:pb-4 gap-2 sm:gap-4 max-w-[1600px]">
        {isLoading ? (
          <>
            {Array.from({ length: cachedSize }).map((_, index) => (
              <Skeleton key={index} className="w-full sm:w-[300px] h-[500px]" />
            ))}
          </>
        ) : (
          library.map((item, index) => {
            const title =
              item.media_type === "tv"
                ? (item as TSeriesCard).name
                : (item as TMovieCard).title;
            const releaseDate =
              item.media_type === "tv"
                ? (item as TSeriesCard).first_air_date
                : (item as TMovieCard).release_date;
            const additionalInfo =
              item.media_type === "tv"
                ? `${(item as TSeriesCard).number_of_seasons} ${t("library.seasons")}`
                : `${(item as TMovieCard).runtime} ${t("library.mins")}`;

            return (
              <Link
                key={index}
                to="/library/$type/$id"
                params={{
                  type: item.media_type,
                  id: item._id,
                }}
                className="w-full sm:w-[300px]"
              >
                <ContentCard
                  title={title}
                  image_path={item.poster_path}
                  additionalInfo={[
                    releaseDate.split("-")[0],
                    " | ",
                    additionalInfo,
                    " | ",
                    item.vote_average.toString(),
                  ]}
                  tags={item.genres}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

// TODO cache library length for skeleton loading
