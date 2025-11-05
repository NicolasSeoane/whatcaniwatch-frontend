import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../features/auth/PrivateRoute";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { FilterMovie } from "../pages/FilterMovie";
import { AIMovie } from "../pages/AIMovie";
import { RandomMovie } from "../pages/RandomMovie";
import { MovieList } from "../pages/MovieList";
import { MovieDetail } from "../components/MovieComponents/MovieDetail";
import { WatchList } from "../pages/WatchList";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filterMovie" element={<FilterMovie />} />
      <Route path="/randomMovie" element={<RandomMovie />} />
      <Route path="/movies/:category" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movieAI" element={<AIMovie />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/favorites" element={<WatchList />} />
      </Route>
    </Routes>
  );
};