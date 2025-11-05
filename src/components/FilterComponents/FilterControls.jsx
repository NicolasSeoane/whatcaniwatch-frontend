export const FilterControls = ({ yearFrom, setYearFrom, yearTo, setYearTo, minRating, setMinRating }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Year range */}
      <div>
        <h3 className="font-semibold mb-2">Year range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={yearFrom}
            onChange={(e) => setYearFrom(Number(e.target.value))}
            className="w-24 p-2 bg-gray-800 rounded-md"
            min="1900"
            max={yearTo}
          />
          <span>—</span>
          <input
            type="number"
            value={yearTo}
            onChange={(e) => setYearTo(Number(e.target.value))}
            className="w-24 p-2 bg-gray-800 rounded-md"
            min={yearFrom}
            max="2025"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Min IMDB rating</h3>
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full accent-red-500/80"
        />
        <p className="text-sm mt-1">⭐ {minRating.toFixed(1)}</p>
      </div>
    </div>
  );
};