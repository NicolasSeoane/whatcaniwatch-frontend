import { useNavigate } from "react-router-dom";
import { MovieCard } from "../MovieComponents/MovieCard";

export const AIMovieList = ({ movies }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 w-full max-w-6xl">
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          movie={m}
          onClick={() => navigate(`/movie/${m.id}`)}
        />
      ))}
    </div>
  );
};