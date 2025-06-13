import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { BookContext } from "../context/bookContext.jsx";
import coverImage from '../assets/images.jpg'

const BookstoreAdmin = () => {
  const { user } = useContext(AuthContext);
  const { getAllBooks, books, addBook, updateBook, deleteBook } = useContext(BookContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    coverImage: "",
    description: "",
  });

  useEffect(() => {
    getAllBooks();
  }, []); // only fetch once

  if (!user?.isAdmin) {
    return (
      <div className="text-center text-black p-10">
        Only Admin is allowed to access this page
      </div>
    );
  }

  const handleAddBook = (e) => {
    e.preventDefault();
    addBook(newBook);
    resetModal();
  };

  const handleEditBook = (index) => {
    setEditIndex(index);
    setNewBook(books[index]);
    setShowEditModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBook((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    await updateBook(newBook, newBook._id);
    resetModal();
  };

  const resetModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditIndex(null);
    setNewBook({
      title: "",
      author: "",
      genre: "",
      price: "",
      coverImage: "",
      description: "",
    });
  };

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
    const combined = `${book.title || ""} ${book.author || ""} ${book.genre || ""}`;
    return combined.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <div className="flex min-h-screen font-sans">
      {/* Main Content */}
      <div className="flex-1 p-5 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-5 gap-3">
          <h1 className="text-2xl font-bold">Manage Books</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 border border-gray-300 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
          >
            Add New Book
          </button>
        </div>

        {/* Search */}
        <div className="mb-5 max-w-md">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <span className="text-gray-500 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search by title, author, genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent flex-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Books Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-50 text-sm text-gray-600 col-12">
                <th className="p-3 text-left col-3">Cover</th>
                <th className="p-3 text-left col-3">Title</th>
                <th className="p-3 text-left col-2">Author</th>
                <th className="p-3 text-left col-2">Genre</th>
                <th className="p-3 text-left col-1">Price</th>
                <th className="p-3 text-left col-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 text-sm hover:bg-gray-50  col-12"
                >
                  <td className="p-3 col-3">
                    <img
                      src={book.coverImage || coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 col-3">{book.title}</td>
                  <td className="p-3 col-2">{book.author}</td>
                  <td className="p-3 col-2">{book.genre}</td>
                  <td className="p-3 col-1">₹{book.price}</td>
                  <td className="p-3 flex gap-2 col-1 items-center m-auto">
                    <button
                      onClick={() => handleEditBook(index)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBooks.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-5 text-center text-gray-400">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal Shared */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-center">
                {showEditModal ? "Edit Book" : "Add New Book"}
              </h2>

              {/* Image Upload */}
              <div className="flex flex-col items-center mb-4">
                <label htmlFor="cover-upload">
                  <img
                    src={
                      newBook.coverImage || coverImage
                    }
                    alt="Cover Preview"
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 cursor-pointer hover:opacity-80"
                    title="Click to upload cover image"
                  />
                </label>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-1">Click image to upload</p>
              </div>

              <form
                onSubmit={showEditModal ? handleUpdateBook : handleAddBook}
                className="space-y-3"
              >
                {["title", "author", "genre", "price"].map((field) => (
                  <input
                    key={field}
                    type={field === "price" ? "number" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newBook[field]}
                    onChange={(e) =>
                      setNewBook({ ...newBook, [field]: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                  />
                ))}
                <textarea
                  placeholder="Description"
                  value={newBook.description}
                  onChange={(e) =>
                    setNewBook({ ...newBook, description: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                  rows={3}
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {showEditModal ? "Update Book" : "Add Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookstoreAdmin;