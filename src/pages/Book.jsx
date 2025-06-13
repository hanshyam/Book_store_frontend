import React, { useEffect, useState, useContext } from "react";
import profile_avatar from "../assets/profile_avatar.png";
import bookCover from "../assets/images.jpg";
import axios from "axios";
import { BookContext } from "../context/bookContext.jsx";
import { AuthContext } from "../context/authContext.jsx";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Book = () => {
  const {
    selectedBook,
    addRating,
    addReview,
    reviews,
    setReviews
    getReview,
  } = useContext(BookContext);

  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    setLoading(true);
    try {
      if (selectedRating !== 0) {
        await addRating(selectedBook._id, selectedRating);
        setSelectedRating(0);
      }
      if (reviewText.trim() !== "") {
        await addReview(selectedBook._id, reviewText.trim());
        setReviewText("");
      }
      await getReview(selectedBook._id);
    } catch (err) {
      toast.error("Failed to submit review");
    }
    setLoading(false);
  };

  const handleLike = async (reviewId) => {
    try {
      await axios.put(`/review/like/${reviewId}`);
      await getReview(selectedBook._id);
    } catch (error) {
      toast.error("Failed to like review");
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      await axios.put(`/review/dislike/${reviewId}`);
      await getReview(selectedBook._id);
    } catch (error) {
      toast.error("Failed to dislike review");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (selectedBook?._id) {
        setLoading(true);
        setReviews([]);
        await getReview(selectedBook._id);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [selectedBook]);

  if (!selectedBook) {
    return <p className="text-center pt-5 text-lg text-gray-500">Loading...</p>;
  }

  return (
    <div className="w-full mx-auto font-sans">
      {/* Breadcrumb */}
      <div className="mt-5 text-sm text-gray-500">
        <span>
          Home / {selectedBook.genre} / {selectedBook.title}
        </span>
      </div>

      {/* Book Details */}
      <div className="flex gap-5 mt-5">
        <img
          src={selectedBook.coverImage || bookCover}
          alt={selectedBook.title}
          className="w-40 object-cover rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-xl font-bold">{selectedBook.title}</h1>
          <p className="text-sm text-gray-600">By {selectedBook.author}</p>
          <p className="text-sm text-gray-600 mt-1">
            Genre: {selectedBook.genre}
          </p>
          <p className="text-sm text-green-700 mt-1 font-medium">
            Price: ₹{selectedBook.price}
          </p>
        </div>
      </div>

      {/* About the Book */}
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">About the Book</h2>
        <p className="text-sm text-gray-700">{selectedBook.description}</p>
      </div>

      {/* Rating Summary */}
      <div className="mt-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold">
            {selectedBook.rating?.toFixed(1) || 0}
          </span>
          <div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-yellow-500 ${
                    i < Math.round(selectedBook.rating) ? "" : "opacity-20"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {selectedBook.ratingNumber || 0} reviews
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Reviews</h2>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading reviews...</p>
        ) : reviews?.length > 0 ? (
          reviews.map((review) => {
            const liked = review.likes?.includes(userId);
            const disliked = review.dislikes?.includes(userId);

            return (
              <div
                key={review._id}
                className="mt-3 border-t border-gray-200 pt-3 pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profile_avatar}
                    alt={review.userId?.fullName || "User"}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {review.userId?.fullName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mt-1">{review.content}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <button
                    onClick={() => handleLike(review._id)}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}{" "}
                    {review.likes?.length || 0}
                  </button>
                  <button
                    onClick={() => handleDislike(review._id)}
                    className="flex items-center gap-1 hover:text-red-600"
                  >
                    {disliked ? <FaThumbsDown /> : <FaRegThumbsDown />}{" "}
                    {review.dislikes?.length || 0}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>

      {/* Write Review */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">Write a Review</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          className="w-full h-24 p-3 border border-gray-300 rounded text-sm focus:outline-none"
        ></textarea>
        <div className="flex gap-2 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedRating(star)}
              className={`px-3 py-1 border rounded text-sm ${
                selectedRating === star
                  ? "bg-blue-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {star} Star{star > 1 ? "s" : ""}
            </button>
          ))}
        </div>
        <button
          onClick={handleReviewSubmit}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Book;
