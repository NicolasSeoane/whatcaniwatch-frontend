import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MovieDetail } from "../components/MovieComponents/MovieDetail";
import { FilterControls } from "../components/FilterComponents/FilterControls";
import { GenreSelector } from "../components/FilterComponents/GenreSelector";
import { getGenres } from "../services/genreService";
import { getFilteredMovie } from "../services/movieService";

export const FilterMovie = () => {
  const [yearFrom, setYearFrom] = useState(2000);
  const [yearTo, setYearTo] = useState(2025);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState(7);
  const [filteredMovie, setFilteredMovie] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 

  //  generos desde backend usando React Query
  const { data: genres, isLoading: loadingGenres, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const handleApplyFilters = async () => {
    setLoading(true);
    setFilteredMovie(null);
    setErrorMsg("");
    setShowFilters(false);

    try {
      const movie = await getFilteredMovie({
        yearFrom,
        yearTo,
        minRating,
        genres: selectedGenres,
      });

      setFilteredMovie(movie.id);
    } catch (error) {
      if (error.status === 404) {
        setErrorMsg("No movie matching those filters. Try again?");
      } else {
        setErrorMsg("Error fetching filtered movie.");
      }

      setFilteredMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAgain = () => {
    setFilteredMovie(null);
    setErrorMsg("");
    setShowFilters(true);
  };

  return (
    <>
      {showFilters && (
        <section className="max-w-4xl mx-auto p-6 bg-gray-950 text-white rounded-2xl shadow-lg mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Filter movie</h2>

          <FilterControls 
            yearFrom={yearFrom} 
            setYearFrom={setYearFrom}
            yearTo={yearTo} 
            setYearTo={setYearTo}
            minRating={minRating} 
            setMinRating={setMinRating} 
          />

          <div className="mt-6">
            <GenreSelector 
              genres={genres}
              loadingGenres={loadingGenres}
              error={error}
              selectedGenres={selectedGenres}
              handleGenreChange={(genre) => setSelectedGenres((prev) =>
                prev.includes(genre)
                  ? prev.filter((g) => g !== genre)
                  : [...prev, genre]
              )}
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleApplyFilters}
              disabled={loading || loadingGenres}
              className="px-6 py-2 bg-red-500/40 cursor-pointer hover:bg-blue-600 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Apply Filters"}
            </button>
          </div>
        </section>
      )}

      {/* Mensaje de error o sin resultados */}
      {!showFilters && errorMsg && (
        <div className="mt-10 text-center text-red-400">
          <p className="text-lg font-semibold mb-4">{errorMsg}</p>
          <button
            onClick={handleSearchAgain}
            className="px-5 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-md text-white font-medium"
          >
            New Search
          </button>
        </div>
      )}

      {/* Mostrar resultado si hay película */}
      {!showFilters && filteredMovie && !errorMsg && (
        <div className="mt-6 flex flex-col items-center">
          <MovieDetail
            movieId={filteredMovie}
            onNewFilter={handleSearchAgain}
            showNewFilterButton
            onAddToFavorites={(m) => console.log("Added:", m)}
            extraActions={
              <button
                onClick={() => console.log("Add to favorites:", filteredMovie)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Add to favorites
              </button>
            }
          />
        </div>
      )}
    </>
  );
};