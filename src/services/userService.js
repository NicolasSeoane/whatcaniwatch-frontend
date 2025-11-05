import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUserWatchList() {
  try {
    const res = await axios.get(`${API_BASE_URL}movies/trending`);
    return res.data;
  } catch (error) {
    console.error("Error in getUserWatchList:", error);
    throw error;
  }
}