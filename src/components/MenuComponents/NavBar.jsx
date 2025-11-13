import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../features/auth/authSlice";
import SearchBar from "./SearchBar";
import { Search } from "lucide-react";

export const NavBar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [mobileMenuOpen, searchOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-black/10 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 text-white">
        {/* LOGO */}
        <Link
          to="/"
          className={`text-2xl font-bold tracking-wide ${
            mobileMenuOpen ? "hidden" : ""
          }`}
        >
          WhatCanIWatch?
        </Link>

        {/* ICONOS MOBILE */}
        {!mobileMenuOpen && (
          <div className="flex items-center space-x-4 md:hidden">
            {/* LUPA */}
            {!searchOpen && (
              <button
                className="text-white"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={22} />
              </button>
            )}

            {/* MENU HAMBURGUESA */}
            <div
              className="w-7 h-5 relative cursor-pointer z-40 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              &#9776;
            </div>
          </div>
        )}

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex space-x-8 items-center text-sm font-medium">
          <li>
            <SearchBar />
          </li>
          <li>
            <Link
              to="/movieAI"
              className="hover:text-red-500 transition-colors"
            >
              AI search
            </Link>
          </li>
          <li>
            <Link
              to="/randomMovie"
              className="hover:text-red-500 transition-colors"
            >
              Random Movie
            </Link>
          </li>
          <li>
            <Link
              to="/filterMovie"
              className="hover:text-red-500 transition-colors"
            >
              Filter Movie
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-red-500 transition-colors"
                >
                  My WatchList
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  className="text-white px-4 py-2 rounded-lg hover:text-red-500 transition-all"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white rounded-lg hover:text-red-500 transition-all"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white px-4 py-2 rounded-lg transition-all w-full sm:w-auto sm:bg-transparent sm:hover:bg-transparent sm:hover:text-red-500 lg:px-4 md:py-2 lg:bg-red-600/50 lg:hover:bg-red-600/80 lg:hover:text-white sm:px-0 sm:mr-4 sm:rounded-md"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* OVERLAY DE BUSQUEDA MOBILE */}
      {searchOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/90 z-[9999] flex flex-col p-6"
          style={{ overscrollBehavior: "none" }}
        >
          <button
            className="self-end text-white text-3xl mb-4"
            onClick={() => setSearchOpen(false)}
          >
            &times;
          </button>

          <div className="w-full">
            <SearchBar onSelectMovie={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};
