import React from "react";
import bookCover from '../assets/images.jpg'
import { useNavigate } from "react-router-dom";

const SearchPage = ()=>{
    const navigate = useNavigate();
    const books = [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'gatsby1.jpg' },
      { title: 'The Great Gatsby: A Graphic Novel', author: 'Fred Fordham', cover: 'gatsby-graphic.jpg' },
      { title: 'The Great Gatsby: The Original 1925 Edition', author: 'F. Scott Fitzgerald', cover: 'gatsby-1925.jpg' },
      { title: 'The Great Gatsby: A Critical Analysis', author: 'Dr. Thomas Wilson', cover: 'gatsby-analysis.jpg' },
    ];
    return(
        <div className="w-full pt-5 font-sans">
          {/* Search Bar */}
          <div className="mt-5">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 w-full max-w-md mx-auto">
              <span className="text-gray-500 mr-2">🔍</span>
              <input
                type="text"
                className="bg-transparent flex-1 text-sm focus:outline-none"
                placeholder="Enter book here"
              />
              <span className="text-gray-500 cursor-pointer">❌</span>
            </div>
          </div>

          {/* Search Results */}
          <div className="mt-5">
            <h1 className="text-2xl font-bold mb-3">Search Results</h1>
            <div className="flex gap-5 p-3 mb-3">
                <div className="mb-4 flex gap-2 items-center">
                <label className="block text-sm mb-1">Genre:</label>
                <select className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm">
                  <option>Select Genre</option>
                </select>
              </div>
              <div className="mb-4 flex gap-2 items-center">
                <label className="block text-sm mb-1">Author:</label>
                <select className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm">
                  <option>Select Author</option>
                </select>
              </div>
              <div className="mb-4 flex gap-2 items-center">
                <label className="block text-sm mb-1">Rating:</label>
                <select className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm">
                  <option>Select Rating</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {books.map((book, index) => (
                <div onClick={()=>navigate('/book')} key={index} className="cursor-pointer">
                  <img
                    src={bookCover}
                    alt={book.title}
                    className="w-full object-cover rounded-lg shadow-md"
                  />
                  <h4 className="text-base font-medium mt-3 mb-1">{book.title}</h4>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-5">
            <button className="px-3 py-1 border border-gray-300 rounded-full">←</button>
            <button className="px-3 py-1 border border-gray-300 rounded-full bg-gray-200">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-full">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-full">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-full">4</button>
            <button className="px-3 py-1 border border-gray-300 rounded-full">5</button>
            <button className="px-3 py-1 border border-gray-300 rounded-full">→</button>
          </div>
        </div>
    )
}

export default SearchPage;