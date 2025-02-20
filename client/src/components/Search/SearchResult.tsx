import type { SearchResultProps } from "@/types/search.types";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import ContentCard from "../ContentCard";

export default function SearchResult({
  moviesList,
  seriesList,
  onClose,
}: SearchResultProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = searchContainerRef.current;
    if (container) {
      container.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [moviesList, seriesList]);

  const hasMovies = moviesList && moviesList.length > 0;
  const hasSeries = seriesList && seriesList.length > 0;

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="w-fit flex flex-col gap-6" ref={searchContainerRef}>
        {hasMovies && (
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("search.movies")}
            </h2>
            <div className="w-fit max-w-[90vw] h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {moviesList.map((movie, index) => (
                <Link
                  key={index}
                  to="/search/$type/$id"
                  params={{
                    type: movie.media_type,
                    id: movie.tmdb_id.toString(),
                  }}
                >
                  <div onClick={onClose}>
                    <ContentCard
                      title={movie.title}
                      image_path={movie.poster_path}
                      additionalInfo={[
                        movie.release_date?.split("-")[0] || "N/A",
                      ]}
                      className="select-none hover:scale-[1.02] transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {hasSeries && (
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("search.series")}
            </h2>
            <div className="w-fit max-w-[90vw] h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {seriesList.map((series, index) => (
                <Link
                  key={index}
                  to="/search/$type/$id"
                  params={{
                    type: series.media_type,
                    id: series.tmdb_id.toString(),
                  }}
                >
                  <div onClick={onClose}>
                    <ContentCard
                      title={series.name}
                      image_path={series.poster_path}
                      additionalInfo={[
                        series.first_air_date?.split("-")[0] || "N/A",
                      ]}
                      className="select-none hover:scale-[1.02] transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
