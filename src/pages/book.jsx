import React from "react";
import profile_avatar from '../assets/profile_avatar.png';
import bookCover from '../assets/images.jpg';

const Book = () => {
  const book = {
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    genre: 'Classic Fiction',
    price: '₹299.00',
    cover: 'secret-garden.jpg',
    description: `The Secret Garden tells the story of Mary Lennox, a spoiled and neglected young girl who is sent to live with her uncle in a large, isolated manor in the English countryside after her parents' death. Initially unhappy and resentful, Mary discovers a hidden, overgrown garden on the grounds and, with the help of a local boy named Dickon and her sickly cousin Colin, begins to restore it to its former glory. As they work together in the garden, the children undergo a transformation, learning about nature, friendship, and the power of positive thinking. The garden becomes a symbol of their personal growth and healing, bringing joy and vitality back into their lives.`,
    rating: 4.5,
    reviewsCount: 125,
    ratingDistribution: [
      { stars: 5, percentage: 40 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 15 },
      { stars: 2, percentage: 10 },
      { stars: 1, percentage: 5 },
    ],
    reviews: [
      {
        user: 'Sophia Clark',
        date: '2023-08-15',
        rating: 5,
        text: 'This book is a timeless classic that I absolutely adored. The characters are well-developed, and the story is both heartwarming and inspiring. The Secret Garden is a must-read for all ages!',
        likes: 50,
        comments: 5,
      },
      {
        user: 'Ethan Miller',
        date: '2023-09-22',
        rating: 4,
        text: 'A charming story with a beautiful message about the healing power of nature and friendship. While the beginning was a bit slow, the story picked up and kept me engaged until the end.',
        likes: 30,
        comments: 10,
      },
      {
        user: 'Olivia Davis',
        date: '2023-10-10',
        rating: 5,
        text: 'I was captivated by the magical atmosphere of the secret garden and the transformation of the characters. A truly enchanting read that I highly recommend.',
        likes: 45,
        comments: 2,
      },
    ],
  };

  return (
    <div className="w-full mx-auto font-sans">
      {/* Breadcrumb */}
      <div className="mt-5 text-sm text-gray-500">
        <span>Home / {book.genre} / {book.title}</span>
      </div>

      {/* Book Details */}
      <div className="flex gap-5 mt-5">
        <img
          src={bookCover}
          alt={book.title}
          className="w-40 object-cover rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-xl font-bold">{book.title}</h1>
          <p className="text-sm text-gray-600">By {book.author}</p>
          <p className="text-sm text-gray-600 mt-1">Genre: {book.genre}</p>
          <p className="text-sm text-green-700 mt-1 font-medium">Price: {book.price}</p>
          <button className="mt-3 px-3 py-1 border bg-blue-500 text-white border-gray-300 rounded text-sm flex items-center gap-1 cursor-pointer">
            Download
          </button>
        </div>
      </div>

      {/* About the Book */}
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">About the Book</h2>
        <p className="text-sm text-gray-700">{book.description}</p>
      </div>

      {/* Reviews */}
      <div className="mt-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold">{book.rating}</span>
          <div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500">★</span>
              ))}
            </div>
            <p className="text-sm text-gray-600">{book.reviewsCount} reviews</p>
          </div>
        </div>

        {/* Individual Reviews */}
        {book.reviews.map((review, index) => (
          <div key={index} className="mt-5 border-t border-gray-200 pt-3">
            <div className="flex items-center gap-3">
              <img
                src={profile_avatar}
                alt={review.user}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{review.user}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            </div>
            <div className="flex gap-1 mt-1">
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className="text-yellow-500">★</span>
              ))}
            </div>
            <p className="text-sm text-gray-700 mt-1">{review.text}</p>
            <div className="flex gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                👍 {review.likes}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review */}
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Write a Review</h2>
        <textarea
          placeholder="Write your review here"
          className="w-full h-24 p-3 border border-gray-300 rounded text-sm focus:outline-none"
        ></textarea>
        <div className="flex gap-2 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              {star} Star{star > 1 ? 's' : ''}
            </button>
          ))}
        </div>
        <button className="mt-3 px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Book;
