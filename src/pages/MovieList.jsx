import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getMoviesByCategory } from "../services/movieService";
import { MovieCard } from "../components/MovieComponents/MovieCard";

export const MovieList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const newMovies = await getMoviesByCategory(category, page);
      setMovies((prev) => {
        if (page === 1) return newMovies;
        const existingIds = new Set(prev.map((m) => m.id));
        const uniqueNew = newMovies.filter((m) => !existingIds.has(m.id));
        return [...prev, ...uniqueNew];
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [category, page]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [category]);

  // IntersectionObserver para detectar cuando el "loader" entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null, // viewport
        rootMargin: "200px", // empieza a cargar antes de que aparezca
        threshold: 0,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loading]);

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              );
            })}
      </div>

      {/* infinite scroll */}
      <div ref={loaderRef} className="flex justify-center mt-8">
        {loading && <p className="text-gray-400">Loading more movies...</p>}
      </div>
    </div>
  );
};