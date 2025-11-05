import { useEffect, useState, useRef } from "react";
import { Hero } from "./Hero";

export const HeroCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Cambiar de pelicula automaticamente
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, movies.length]);

  return (
    <section
      className="relative h-[70vh] w-full text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {movies.map((movie, index) => (
        <Hero
          key={movie.id || index}
          movie={movie}
          isActive={index === currentIndex}
        />
      ))}

      {/* Indicadores (los puntitos abajo) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {movies.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};