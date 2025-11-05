import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const searchMoviesByPrompt = async (prompt) => {
  try {
    const res = await axios.get(`${API_BASE_URL}ai/search`, {
      params: { prompt }
    });
    return res.data;
  } catch (error) {
    console.error("Error in searchMoviesByPrompt", error);
    throw error;
  }
};