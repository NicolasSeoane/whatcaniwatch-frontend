import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "./MovieCard";

export const MovieRow = ({ title, movies = [], onSeeAllPath }) => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(5); // cuantas peliculas mostrar
  const maxIndex = Math.max(0, movies.length - visibleCount);

  const next = () =>
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  const prev = () => setStartIndex((prev) => (prev > 0 ? prev - 1 : prev));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full mt-10">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <button
          onClick={() => navigate(onSeeAllPath)}
          className="text-md hover:cursor-pointer hover:animate-pulse flex items-center gap-1 ml-8"
        >
          See more <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="relative group">
        {/* carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
            }}
          >
             {movies.map((movie) => {
              const flexBasis =
                visibleCount === 2
                  ? "50%"
                  : visibleCount === 3
                  ? "33.3333%"
                  : "20%";

              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  flexBasis={flexBasis}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              );
            })}
          </div>
        </div>

        {/* left arrow */}
        <button
          onClick={prev}
          hidden={startIndex === 0}
          className={`absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-black/60 to-transparent 
                      items-center justify-center text-white transition-opacity duration-300 
                      opacity-0 group-hover:opacity-100`}
        >
          <ChevronLeft size={28} />
        </button>

        {/* right arrow/ view more */}
        {startIndex >= maxIndex ? (
          <button
            onClick={() => navigate(onSeeAllPath)}
            className={`absolute right-0 top-0 h-full w-14 cursor-pointer bg-gradient-to-l from-black/60 to-transparent 
                      items-center justify-center text-white transition-opacity duration-300 
                      opacity-0 group-hover:opacity-100`}
          >
            View More →
          </button>
        ) : (
          <button
            onClick={next}
            className={`absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-black/60 to-transparent 
                      items-center justify-center text-white transition-opacity duration-300 
                      opacity-0 group-hover:opacity-100`}
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </section>
  );
};
