import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "../../services/favoriteService";

export const FavButton = ({ movie, isFavorite, favoriteId, user }) => {
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const [localFavoriteId, setLocalFavoriteId] = useState(favoriteId);

  const handleToggleFavorite = async () => {
    if (!user) return;
    try {
      if (localIsFavorite) {
        await removeFavorite(user.token, localFavoriteId);
        setLocalIsFavorite(false);
      } else {
        const newFav = await addFavorite(user.token, {
          itemId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        });
        setLocalIsFavorite(true);
        setLocalFavoriteId(newFav._id);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  useEffect(() => {
    setLocalIsFavorite(isFavorite);
    setLocalFavoriteId(favoriteId);
  }, [isFavorite, favoriteId]);

  return (
    <button
      onClick={handleToggleFavorite}
      className={`px-4 py-2 rounded-md cursor-pointer ${
        localIsFavorite
          ? "bg-gray-600 hover:bg-gray-700"
          : "bg-rose-900 hover:bg-red-700"
      }`}
    >
      {localIsFavorite ? "Remove from watchlist" : "Add to watchlist"}
    </button>
  );
};
