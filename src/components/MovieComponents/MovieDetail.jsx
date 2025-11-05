import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieService";
import { getFavorites } from "../../services/favoriteService"
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FavButton } from "./FavButton";

export const MovieDetail = ({
  movieId: propMovieId,
  onNext,
  onNewFilter,
  showNextButton = false,
  showNewFilterButton = false,
}) => {
  const { id: routeId } = useParams(); // id desde la URL
  const movieId = propMovieId || routeId; // prioriza prop, usa ruta si no hay prop
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  // --- cargar pelicula ---
  useEffect(() => {
    const loadMovie = async () => {
      if (!movieId) return;
      try {
        const fetchedMovie = await getMovieById(movieId);
        setData(fetchedMovie);
      } catch (err) {
        console.error(err);
        setError("Error loading movie details.");
      }
    };
    loadMovie();
  }, [movieId]);

  // --- verificar si esta en favoritos ---
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !data) return;
      try {
        const favorites = await getFavorites(user.token);
        const existing = favorites.find((fav) => parseInt(fav.itemId) === data.id);
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
  }, [user, data, movieId]);


  if (error) return <p className="text-center text-red-400 mt-10">{error}</p>;
  if (!data) return <p className="text-center text-white mt-10">Loading...</p>;

  // --- trailer e imágenes ---
  const trailer = data.videos?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const images = data.images?.backdrops || [];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center text-white p-6">
      {/* ---------- POSTER + INFO ---------- */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl w-full">
        {/* Poster */}
        <div className="flex justify-center md:w-1/2">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            className="rounded-lg shadow-lg max-h-[600px] object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center md:w-1/2 text-left space-y-4">
          <h2 className="text-4xl font-bold">{data.title}</h2>

          <div className="flex items-center gap-4">
            {data.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${data.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-yellow-400 text-lg"
              >
                <img
                  src="/src/assets/imdb-logo.png"
                  alt="IMDb logo"
                  className="h-10"
                />
                <span>{data.vote_average?.toFixed(1)}</span>
              </a>
            )}

            <div className="flex gap-4 text-gray-300 text-lg">
              {data.runtime && <span>{data.runtime} min</span>}
              {data.release_date && (
                <span>{new Date(data.release_date).getFullYear()}</span>
              )}
            </div>
          </div>

          {data.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-200"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-300 text-lg">{data.overview}</p>

          <div className="flex gap-4 pt-4">
            {showNextButton && (
              <button
                onClick={onNext}
                className="bg-gray-600 cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
              >
                Next Movie..
              </button>
            )}
            {showNewFilterButton && (
              <button
                onClick={onNewFilter}
                className="bg-gray-600 cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
              >
                New search..
              </button>
            )}
            {user && ( <FavButton movie={data} isFavorite={isFavorite} favoriteId={favoriteId} user={user}/>
            )}
          </div>
        </div>
      </div>

      {/* ---------- TRAILER + GALERIA ---------- */}
      {(trailer || images.length > 0) && (
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-16 max-w-6xl w-full">
          {/* Trailer */}
          {trailer && (
            <div className="w-full md:w-[55%] aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                className="w-full h-full rounded-xl shadow-lg"
              ></iframe>
            </div>
          )}

          {/* galería */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 w-full md:w-[40%]">
              {images.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Backdrop ${index}`}
                  className="rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsGalleryOpen(true);
                  }}
                />
              ))}

              {/* Botón ver más */}
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="rounded-xl bg-gray-800 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-gray-700 transition"
              >
                View More +
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------- Modal galería ---------- */}
      {isGalleryOpen && images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={() => setIsGalleryOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setIsGalleryOpen(false);
            }}
          >
            <X />
          </button>

          {/* Imagen principal */}
          <div className="relative w-full max-w-5xl flex items-center justify-center">
            <button
              onClick={handlePrevImage}
              className="absolute left-4 text-white p-2 rounded-full hover:bg-white/10"
            >
              <ChevronLeft size={40} />
            </button>

            <img
              src={`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`}
              alt={`Backdrop ${currentIndex}`}
              className="max-h-[80vh] rounded-lg shadow-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={handleNextImage}
              className="absolute right-4 text-white p-2 rounded-full hover:bg-white/10"
            >
              <ChevronRight size={40} />
            </button>
          </div>

          {/* Miniaturas */}
          <div className="flex gap-2 mt-6 overflow-x-auto max-w-5xl px-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/w200${img.file_path}`}
                alt={`Thumb ${i}`}
                className={`h-20 rounded-md cursor-pointer transition-transform ${
                  i === currentIndex
                    ? "ring-4 ring-blue-500 scale-105"
                    : "hover:scale-105"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
