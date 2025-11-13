import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function getTrendingMovies() {
  try {
    const res = await axios.get(`${API_BASE_URL}movies/trending`);
    return res.data;
  } catch (error) {
    console.error("Error in getTrendingMovies:", error);
    throw error;
  }
}

export async function getMovieById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in getMovieById:", error);
    throw error;
  }
}

export async function getMoviesByQuery(query) {
  try {
    const res = await axios.get(`${API_BASE_URL}movies/search`, {
      params: { query }
    });
    return res.data?.slice(0, 6) || [];
  } catch (error) {
    console.error("Error in getMoviesByQuery:", error);
    throw error;
  }
}

export async function getMoviesByCategory(category, page) {
  try {
    const res = await axios.get(`${API_BASE_URL}movies/${category}`, {
      params: { page }
    });
    return res.data.results;
  } catch (error) {
    console.error("Error in getMoviesByCategory:", error);
    throw error;
  }
}

export async function getRandomMovie() {
  try {
    const res = await axios.get(`${API_BASE_URL}movies/randomMovie`);
    const id = res.data;

    if (!id) throw new Error("Could not get random id");

    return id;
  } catch (error) {
    console.error("Error in getRandomMovie:", error);
    throw error;
  }
}

export const getFilteredMovie = async ({ yearFrom, yearTo, minRating, genres }) => {
  const queryParams = new URLSearchParams({
    minYear: yearFrom,
    maxYear: yearTo,
    minRating,
    genre: genres.join(","),
  });

  try {
    const response = await axios.get(`${API_BASE_URL}movies/filteredMovie`, {
      params: queryParams
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Si hay una respuesta de error del servidor
      const errorData = error.response.data || {};
      const message = errorData.message || "Could not fetch filtered movies";
      const status = error.response.status;
      const err = new Error(message);
      err.status = status;
      throw err;
    } else {
      // Error en la solicitud (por ejemplo, si el servidor no responde)
      console.error("Unknown or server error:", error);
      throw new Error("Server error");
    }
  }
};
