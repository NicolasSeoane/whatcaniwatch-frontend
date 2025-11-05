import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FavButton } from "./FavButton";
import { getFavorites } from "../../services/favoriteService";

export const Hero = ({ movie, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  // --- verificar si está en favoritos ---
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !movie) return;
      try {
        const favorites = await getFavorites(user.token);
        const existing = favorites.find(
          (fav) => parseInt(fav.itemId) === movie.id
        );
        if (existing) {
          setIsFavorite(true);
          setFavoriteId(existing._id);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } catch (err) {
        console.error("Error checking favorites:", err);
      }
    };
    checkFavorite();
  }, [user, movie]);

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ease-in-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-80"
        }`}
      />

      {/* Contenido */}
      <div className="relative z-10 p-8 flex flex-col justify-end h-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        <div
          className={`text-gray-200 text-lg transition-all duration-500 ease-in-out ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 pointer-events-none"
          }`}
        >
          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-gray-800 px-3 py-1 my-3 rounded-full text-sm text-gray-200"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          <p>{movie.overview}</p>
        </div>

        <div className="flex items-center gap-4 mt-6">
          {user && (
            <FavButton
              movie={movie}
              isFavorite={isFavorite}
              favoriteId={favoriteId}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
};
