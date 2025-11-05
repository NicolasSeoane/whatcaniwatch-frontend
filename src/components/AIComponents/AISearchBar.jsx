import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export const AISearchBar = ({ onSearch, setPrompt, onClear }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setPrompt(input);
  }, [input, setPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };

  const handleClearSearch = () => {
    setInput("");
    onClear();
  };

  //ajusta la altura del textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

    // para que el Enter envie el formulario en vez de saltar de renglon
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-xl bg-gray-800 rounded-2xl p-3 shadow-lg"
      >
        <textarea
          placeholder="Eg: Horror movie with a serial killer"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={500}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2 resize-none overflow-hidden"
          rows="1"
        />
        <button type="submit" className="p-2 hover:scale-105 transition">
          <Search className="text-blue-400 cursor-pointer" />
        </button>
      </form>
      <button
        onClick={handleClearSearch}
        className="px-6 py-2 my-4 text-black bg-gray-400 cursor-pointer hover:bg-white rounded-lg font-semibold transition disabled:opacity-50"
      >
        Clear Search
      </button>
    </>
  );
};