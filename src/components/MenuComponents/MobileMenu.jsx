import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-black/90 z-40 flex flex-col items-center justify-center
                transition-all duration-300 ease-in-out
                ${
                  mobileMenuOpen
                    ? "h-screen opacity-100 pointer-events-auto"
                    : "h-0 opacity-0 pointer-events-none"
                }`}
    >
      <button
        onClick={() => setMobileMenuOpen(false)}
        className="absolute top-6 right-6 text-3xl text-white focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>
      <Link
        to="/"
        className="text-3xl font-semibold text-white my-4 transform transition-transform duration-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        What Can I Watch?
      </Link>
      <Link
        to="/movieAI"
        className="text-2xl font-semibold text-white my-4 transform transition-transform duration-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        AI search
      </Link>
      <Link
        to="/randomMovie"
        className="text-2xl font-semibold text-white my-4 transform transition-transform duration-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        Random Movie
      </Link>
      <Link
        to="/filterMovie"
        className="text-2xl font-semibold text-white my-4 transform transition-transform duration-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        Filter Movie
      </Link>
      {user ? (
        <>
          <Link
            to="/favorites"
            className="text-2xl font-semibold text-white my-4 transform transition-transform duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            My Watchlist
          </Link>
          <hr className="w-sm text-gray-400" />
          <button
            className="text-2xl font-semibold text-white my-4 transform transition-transform duration-300"
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-2xl font-semibold text-white my-4 transform transition-transform duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="bg-red-600/50 text-2xl font-semibold text-white my-4 py-2 px-4 rounded-lg transform transition-transform duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};
