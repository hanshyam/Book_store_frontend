import React from "react";
import bookCover from '../assets/images.jpg'

const Home = () =>{
    const books = [
      { title: 'The Secret Garden', author: 'Frances Hodgson Burnett', cover: '' },
      { title: 'Pride and Prejudice', author: 'Jane Austen', cover: '' },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: '' },
      { title: '1984', author: 'George Orwell', cover: '' },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: '' },
      { title: 'Moby Dick', author: 'Herman Melville', cover: '' },
    ];
   return(
      <>
        <div className="w-full py-5 font-sans">
          {/* Main Content */}
          <div className="flex gap-5 mt-5">
            {/* Filter Section */}
            <div className="w-48">
              <h3 className="text-lg font-semibold mb-3">Filter by</h3>
              <div className="mb-4">
                <label className="block text-sm mb-1 ">Genre</label>
                <select className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm">
                  <option>Select Genre</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Author</label>
                <select className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm">
                  <option>Select Author</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Rating</label>
                <select className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm">
                  <option>Select Rating</option>
                </select>
              </div>
            </div>

            {/* Book Grid Section */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-5">Explore Books</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {books.map((book, index) => (
                  <div key={index} className="cursor-pointer">
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
          </div>
        </div>
      </>
   )
};

export default Home;