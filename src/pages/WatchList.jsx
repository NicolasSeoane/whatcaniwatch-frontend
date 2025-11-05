import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../services/favoriteService";
import { MovieCard } from "../components//MovieComponents/MovieCard";


export const WatchList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const fetchWatchList = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const myWatchList = await getFavorites(user.token);
      setMovies(myWatchList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl text-center font-bold mb-6 capitalize">My Watchlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => navigate(`/movie/${movie.itemId}`)}
            />
          );
        })}
      </div>
    </div>
  );
};
