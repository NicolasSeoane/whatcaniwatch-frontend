import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}favorites`;

export async function getFavorites(token) {
  const res = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
}

export async function addFavorite(token, movieData) {
  const res = await axios.post(API_BASE_URL, movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
}

export async function removeFavorite(token, favoriteId) {
  const res = await axios.delete(`${API_BASE_URL}/${favoriteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
}