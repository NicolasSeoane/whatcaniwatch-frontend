import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getGenres() {
  try {
    const res = await axios.get(`${API_BASE_URL}genres/all`);
    return res.data;
  } catch (error) {
    console.error("Error in getGenres:", error);
    throw error;
  }
}
