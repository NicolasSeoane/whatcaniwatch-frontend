import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../features/auth/authSlice";

export const NavBar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);

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
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-black/10 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 text-white">
        {/**LOGO */}
        <Link
          to="/"
          className={`text-2xl font-bold tracking-wide  ${
            mobileMenuOpen ? "hidden" : ""
          }`}
        >
          WhatCanIWatch?
        </Link>

        {/* HAMBURGER MENU */}
        <div
          className={`w-7 h-5 relative cursor-pointer z-40 md:hidden text-white  ${
            mobileMenuOpen ? "hidden" : ""
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          &#9776;
        </div>

        {/**DESKTOP MENU */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
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
            <ul className="hidden md:flex space-x-8 text-sm font-medium">
              <li>
                <Link to="/favorites">My WatchList</Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" text-white px-4 py-2 rounded-lg transition-all"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white px-4 py-2 rounded-lg transition-all"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-red-600/50 hover:bg-red-600/80 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
