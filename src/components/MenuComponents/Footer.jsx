import tmdbLogo from "../../assets/tmdblogo.svg"

export const Footer = () => {
  return (
    <footer className="bg-black/60 text-gray-300 py-3 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Sección izquierda */}
        <div className="flex items-center gap-2">
          <span className="text-sm">
            © {new Date().getFullYear()} WhatCanIWatch — Developed by{" "}
            <a
              href="https://www.linkedin.com/in/nicolas-seoane/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition"
            >
              Nicolas Seoane
            </a>
          </span>
        </div>

        {/* Sección derecha */}
        <div className="flex flex-col items-center md:items-end text-sm">
          <p className="flex items-center gap-1">
            Powered by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition"
            >
              <img src={tmdbLogo} alt="TMDB Logo" className="h-4"/>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};