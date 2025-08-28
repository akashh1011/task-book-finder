import React, { useState } from "react";

export default function BookFinder() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function: Get best available cover
  const getCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    if (book.isbn && book.isbn.length > 0) {
      return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
    }
    if (book.edition_key && book.edition_key.length > 0) {
      return `https://covers.openlibrary.org/b/olid/${book.edition_key[0]}-M.jpg`;
    }
    return null;
  };

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();

      const keyword = query.toLowerCase();

      // Filter by keyword in title
      let filtered = data.docs.filter(
        (book) => book.title && book.title.toLowerCase().includes(keyword)
      );

      // Deduplicate by unique title
      const uniqueBooks = [];
      const seenTitles = new Set();

      for (let b of filtered) {
        const titleKey = b.title?.toLowerCase().trim();
        if (titleKey && !seenTitles.has(titleKey)) {
          seenTitles.add(titleKey);
          uniqueBooks.push(b);
        }
      }

      setBooks(uniqueBooks.slice(0, 20)); // limit after deduplication
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex flex-col items-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
        📚 Book Finder
      </h1>

      {/* Search Form */}
      <form
        onSubmit={searchBooks}
        className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Search for a book by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 rounded-2xl border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p className="text-gray-700 font-medium">Loading...</p>}

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {books.length > 0 ? (
          books.map((book, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Book Cover */}
              {getCoverUrl(book) ? (
                <img
                  src={getCoverUrl(book)}
                  alt={book.title}
                  className="w-32 h-44 object-cover rounded mb-3 shadow"
                />
              ) : (
                <div className="w-32 h-44 bg-gray-300 flex items-center justify-center rounded mb-3 text-sm text-gray-600">
                  No Cover
                </div>
              )}

              {/* Book Info */}
              <h2 className="font-semibold text-center text-lg line-clamp-2">
                {book.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
              </p>
              <p className="text-xs text-gray-500">
                {book.first_publish_year || "N/A"}
              </p>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-700 font-medium">No books found</p>
        )}
      </div>
    </div>
  );
}
