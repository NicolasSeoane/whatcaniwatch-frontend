import { useEffect, useState } from "react";
import { HeroCarousel } from "../components/MovieComponents/HeroCarousel";
import { MovieRow } from "../components/MovieComponents/MovieRow";
import { getTrendingMovies, getMoviesByCategory} from "../services/movieService";

export const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);

  const fetchHeroMovies = async () => {
    try {
      const heroCarouselMovies = await getTrendingMovies();

      setFeatured(heroCarouselMovies);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const popularMoviesData = await getMoviesByCategory('popular', 1);
      setPopular(popularMoviesData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHeroMovies();
    fetchPopularMovies();
  }, []);

  

  return (
    <div className="min-h-screen text-white p-6">
      <HeroCarousel movies={featured} />
      <MovieRow
        title="Popular"
        movies={popular}
        onSeeAllPath="/movies/popular"
      />
    </div>
  );
};
