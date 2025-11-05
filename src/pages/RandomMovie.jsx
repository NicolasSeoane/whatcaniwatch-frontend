import { useState, useEffect } from "react";
import { getRandomMovie } from "../services/movieService";
import { MovieDetail } from "../components/MovieComponents/MovieDetail";

export const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const [movieID, setMovieID] = useState(null);

  const fetchRandomMovie = async () => {
    const data = await getRandomMovie();
    setMovie(data);
    setMovieID(data);
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  if (!movie) return <p className="text-center text-white mt-10">Loading...</p>;
  return (
    <MovieDetail
      movieId={movieID}
      onNext={fetchRandomMovie}
      showNextButton
    />
  );
};
