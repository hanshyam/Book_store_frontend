import { createContext, useContext, useState, useMemo } from "react";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const { axios } = useContext(AuthContext);

  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Get all books
  const getAllBooks = async () => {
    try {
      const { data } = await axios.get("/book/");
      if (data.success) {
        setBooks(data.bookData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add Book
  const addBook = async (payload) => {
    try {
      const { data } = await axios.post("/book/", payload);
      if (data.success) {
        setBooks((prevBooks) => [...prevBooks, payload]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Update Book
  const updateBook = async (payload, bookId) => {
    try {
      const { data } = await axios.put(`/book/${bookId}`, payload);
      if (data.success) {
        toast.success("Book Updated Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete Book
  const deleteBook = async (bookId) => {
    try {
      const { data } = await axios.delete(`/book/${bookId}`);
      if (data.success) {
        toast.success(data.message);
        setBooks((prev) => prev.filter((book) => book._id !== bookId));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get Book by ID
  const getBook = async (bookId) => {
    try {
      const { data } = await axios.get(`/book/${bookId}`);
      if (data.success) {
        setSelectedBook(data.bookData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add Rating
  const addRating = async (bookId, rating) => {
    try {
      const { data } = await axios.put(`/book/rate/${bookId}`, { rating: Number(rating) });
      if (data.success) {
        setSelectedBook(data.bookData);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add Review
  const addReview = async (bookId, content) => {
    try {
      const { data } = await axios.post(`/review/${bookId}`, { content });
      if (data.success) {
        setReviews((prev) => [...prev, data.reviewData]);
        toast.success("Review Added Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get Reviews
  const getReview = async (bookId) => {
    try {
      const { data } = await axios.get(`/review/${bookId}`);
      if (data.success) {
        setReviews(data.reviewData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Unique genres (string)
  const genres = useMemo(() => {
    return Array.from(new Set(books.map(book => book.genre?.trim()).filter(Boolean)));
  }, [books]);

  // ✅ Unique authors
  const authors = useMemo(() => {
    return Array.from(new Set(books.map(book => book.author?.trim()).filter(Boolean)));
  }, [books]);

  const value = {
    books,
    setBooks,
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
    getBook,
    addRating,
    selectedBook,
    setSelectedBook,
    reviews,
    addReview,
    getReview,
    searchInput,
    setSearchInput,
    genres,
    authors
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};
