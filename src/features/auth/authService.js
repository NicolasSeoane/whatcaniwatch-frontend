import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Registrar usuario
const register = async (userData) => {
  const response = await axios.post(`${API_URL}auth/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Loguear usuario
const login = async (userData) => {
  const response = await axios.post(`${API_URL}auth/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login con Google
const googleLogin = async (credential) => {
  try {
    const res = await axios.post(
      `${API_URL}auth/google`,
      { credential },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = res.data;
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error with Google Login");
  }
};

// Cerrar sesion
const logout = () => {
  localStorage.removeItem("user");
};

export const authService = {
  register,
  login,
  googleLogin,
  logout,
};
