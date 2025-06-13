import React, { useContext, useEffect, useState } from "react";
import bookCover from "../assets/images.jpg"; // fallback image
import { BookContext } from "../context/bookContext.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { books, getAllBooks, setSelectedBook, genres, authors } = useContext(BookContext);
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");
  const [selectedRating, setSelectedRating] = useState("All Ratings");

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    navigate(`/book/${book._id}`);
  };

  const filteredBooks = books?.filter((book) => {
    const genreMatch = selectedGenre === "All Genres" || book.genre === selectedGenre;
    const authorMatch = selectedAuthor === "All Authors" || book.author === selectedAuthor;
    const ratingMatch =
      selectedRating === "All Ratings" || (book.rating && book.rating >= Number(selectedRating));
    return genreMatch && authorMatch && ratingMatch;
  }) || [];

  const clearFilters = () => {
    setSelectedGenre("All Genres");
    setSelectedAuthor("All Authors");
    setSelectedRating("All Ratings");
  };

  return (
    <div className="w-full py-5 font-sans px-4">
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        {/* Filter Section */}
        <aside className="md:w-64 w-full">
          <h3 className="text-lg font-semibold mb-3">Filter by</h3>

          <div className="mb-4">
            <label className="block text-sm mb-1">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
              aria-label="Select Genre"
            >
              <option>All Genres</option>
              {genres?.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Author</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
              aria-label="Select Author"
            >
              <option>All Authors</option>
              {authors?.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Rating</label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
              aria-label="Select Rating"
            >
              <option>All Ratings</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} ★ & up
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 underline mt-2"
          >
            Clear Filters
          </button>
        </aside>

        {/* Book Grid Section */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-5">Explore Books</h1>

          {filteredBooks.length === 0 ? (
            <p className="text-gray-500">No books found matching your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredBooks.map((book) => (
                <div
                  onClick={() => handleBookClick(book)}
                  key={book._id}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 p-2 rounded border border-gray-100"
                >
                  <img
                    src={book.coverImage || bookCover}
                    alt={book.title || "Book Cover"}
                    loading="lazy"
                    className="w-full h-52 object-cover rounded-lg shadow-sm"
                  />
                  <h4 className="text-base font-medium mt-3 mb-1 truncate">{book.title}</h4>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-400">{book.genre}</p>
                  <p className="text-green-600 font-medium">₹ {book.price}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
