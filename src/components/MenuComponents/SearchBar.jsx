import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviesByQuery } from "../../services/movieService";

export default function SearchBar({ onSelectMovie }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const movieResults = await getMoviesByQuery(query);
        setResults(movieResults);
        setShowDropdown(true);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Alternar el estado del dropdown cuando el input recibe el foco
  const handleFocus = () => {
    if (query.trim() && !showDropdown) {
      setShowDropdown(true); // Si ya hay resultados, abrir el dropdown
    }
  };

  const handleSelect = (movie) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/movie/${movie.id}`);
    if (onSelectMovie) onSelectMovie();
  };

  return (
    <div className="relative mx-4 max-w-sm text-gray-200">
      <div className="flex flex-col items-center w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search for a movie..."
          className="w-full px-4 py-2 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-800 focus:w-[120%] transition-all duration-300"
        />
      </div>

      {loading && (
        <div className="absolute right-3 top-2 text-gray-400 animate-pulse">
          ...
        </div>
      )}

      {showDropdown && results.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 bg-gray-900 border border-gray-700 mt-2 rounded-lg max-h-80 overflow-y-auto shadow-lg w-full transition-all duration-300"
          style={{
            width: query ? '120%' : '100%',
            left: query ? '-10%' : '0',
          }}
        >
          {results.map((movie) => (
            <li
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer transition"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-10 h-14 rounded"
                />
              ) : (
                <div className="w-10 h-14 bg-gray-700 rounded" />
              )}
              <div>
                <p className="font-semibold">{movie.title}</p>
                <p className="text-xs text-gray-400">
                  {movie.release_date?.slice(0, 4) || "—"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}