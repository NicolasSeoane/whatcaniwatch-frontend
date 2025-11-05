import { useState } from "react";
import { AISearchBar } from "../components/AIComponents/AISearchBar";
import { AIMovieList } from "../components/AIComponents/AIMovieList";
import { AILoading } from "../components/AIComponents/AILoading";
import { ErrorMessage } from "../components/UIComponents/ErrorMessage";
import { searchMoviesByPrompt } from "../services/aiService";

export const AIMovie = () => {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClearSearch = () => {
    setPrompt("");
    setMovies([]);
  };

  const handleSearch = async (query) => {
    setPrompt(query);
    setLoading(true);
    setError(null);
    try {
      const result = await searchMoviesByPrompt(query);
      setMovies(result);
      if (result.length == 0) {
        setError("No movies found with that description");
      }
    } catch (err) {
      setError("Error fetching movies with AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8  text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search your movie with AI
      </h1>
      <AISearchBar
        onSearch={handleSearch}
        setPrompt={setPrompt}
        onClear={handleClearSearch}
      />
      {loading && <AILoading />}
      {error && <ErrorMessage message={error}/>}
      {movies.length > 0 && !loading && <AIMovieList movies={movies} />}
    </div>
  );
};
