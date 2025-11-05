export const MovieCard = ({ movie, onClick, flexBasis }) => {

  const handleAuxClick = (event) => {
    if (event.button === 1) {
      event.preventDefault();
      window.open(`/movie/${movie.id}`, '_blank');
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseDown={handleAuxClick}//click de la rueda
      className="relative cursor-pointer flex-shrink-0 p-2 group/movie"
      style={{ flexBasis }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/movie:scale-105"
        />
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-all flex items-end justify-center pb-3">
          <p className="w-full text-white text-base text-xl font-semibold text-center bg-black/70 transition-all duration-300 px-2">
            {movie.title}
          </p>
        </div>
      </div>
    </div>
  );
};