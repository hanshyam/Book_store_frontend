import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bookCover from "../assets/images.jpg";
import { BookContext } from "../context/bookContext.jsx";

const SearchPage = () => {
  const navigate = useNavigate();
  const {
    searchInput,
    books,
    setSearchInput,
    authors,
    genres,
  } = useContext(BookContext);

  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");
  const [selectedRating, setSelectedRating] = useState("All Ratings");

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const filteredBooks = books?.filter((book) => {
    const input = searchInput.trim().toLowerCase();

    const matchSearch =
      book.title?.toLowerCase().includes(input) ||
      book.author?.toLowerCase().includes(input) ||
      book.genre?.toLowerCase().includes(input);

    const matchGenre = selectedGenre === "All Genres" || book.genre === selectedGenre;
    const matchAuthor = selectedAuthor === "All Authors" || book.author === selectedAuthor;
    const matchRating =
      selectedRating === "All Ratings" || (book.rating && book.rating >= parseInt(selectedRating));

    return matchSearch && matchGenre && matchAuthor && matchRating;
  }) || [];

  const clearFilters = () => {
    setSearchInput("");
    setSelectedGenre("All Genres");
    setSelectedAuthor("All Authors");
    setSelectedRating("All Ratings");
  };

  return (
    <div className="w-full pt-5 font-sans">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 w-full max-w-md mx-auto">
        <span className="text-gray-500 mr-2">🔍</span>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="bg-transparent flex-1 text-sm focus:outline-none"
          placeholder="Search books by title, author..."
        />
        {searchInput && (
          <span
            className="text-gray-500 cursor-pointer"
            onClick={() => setSearchInput("")}
          >
            ❌
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-5 p-3 mb-3 justify-center flex-wrap mt-5">
        {/* Genre */}
        <div className="flex gap-2 items-center">
          <label className="text-sm">Genre:</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-gray-50 text-sm"
          >
            <option>All Genres</option>
            {genres?.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div className="flex gap-2 items-center">
          <label className="text-sm">Author:</label>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-gray-50 text-sm"
          >
            <option>All Authors</option>
            {authors?.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="flex gap-2 items-center">
          <label className="text-sm">Rating:</label>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-gray-50 text-sm"
          >
            <option>All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ★ & up
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 underline mt-1"
        >
          Clear Filters
        </button>
      </div>

      {/* Results */}
      <div className="mt-5 px-5">
        <h1 className="text-2xl font-bold mb-3">Search Results</h1>
        {filteredBooks.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                onClick={() => handleBookClick(book._id)}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300 p-2 border rounded"
              >
                <img
                  src={book.coverImage || bookCover}
                  alt={book.title || "Book Cover"}
                  loading="lazy"
                  className="w-full h-52 object-cover rounded-lg shadow-sm"
                />
                <h4 className="ml-1 text-base font-medium mt-3 mb-1 truncate">
                  {book.title}
                </h4>
                <p className="ml-1 text-sm text-gray-600">{book.author}</p>
                <p className="ml-1 text-sm text-gray-400">{book.genre}</p>
                <p className="ml-1 text-sm text-green-600">₹ {book.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
