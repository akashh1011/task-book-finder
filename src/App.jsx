import { useState } from "react";
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // default: title
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      // Build API URL based on dropdown selection
      const url = `https://openlibrary.org/search.json?${searchBy}=${encodeURIComponent(
        query
      )}`;

      const res = await axios.get(url);

      const data = (res?.data?.docs ?? []).map((book) => ({
        key: book.key,
        title: book.title ?? "Untitled",
        author: Array.isArray(book.author_name)
          ? book.author_name.join(", ")
          : "Unknown",
        year: book.first_publish_year ?? "N/A",
      }));

      setBooks(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">📚 Book Finder</h1>

      {/* Search Form */}
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
        {/* Dropdown */}
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="px-4 py-2 rounded-xl text-black shadow outline-none"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="first_publish_year">Year</option>
        </select>

        {/* Input */}
        <input
          type="text"
          placeholder={`Enter ${searchBy}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl text-black outline-none shadow"
        />

        {/* Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-xl shadow hover:bg-yellow-300"
        >
          Search
        </button>
      </form>

      {/* Error */}
      {error && <p className="mt-4 text-red-200">{error}</p>}

      {/* Loading */}
      {loading && <p className="mt-4 animate-pulse">🔄 Searching...</p>}

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {books.map((book) => (
          <div
            key={book.key}
            className="bg-white/10 rounded-xl p-4 shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-sm mt-1">👤 {book.author}</p>
            <p className="text-sm">📅 {book.year}</p>
          </div>
        ))}
      </div>

      {/* No results */}
      {!loading && !error && query.trim() !== "" && books.length === 0 && (
        <p className="mt-6 text-lg">No results found 😢</p>
      )}
    </div>
  );
}
