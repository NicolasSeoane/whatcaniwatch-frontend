export const GenreSelector = ({ genres, loadingGenres, error, selectedGenres, handleGenreChange }) => {
  if (loadingGenres) {
    return <p className="text-gray-400">Loading genres...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading genres</p>;
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Genres</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {genres.map((genre) => (
          <label
            key={genre.id}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
              selectedGenres.includes(genre.id)
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleGenreChange(genre.id)}
            />
            <span>{genre.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};