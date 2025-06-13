import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import { BookContext } from "../context/bookContext";

const Header = () => {
  const { searchInput, setSearchInput } = useContext(BookContext);
  const { user, logout, searchSuggestion, getSearchSuggestions } = useContext(AuthContext);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSearchSuggestions(); // Only once on mount
  }, []);

  useEffect(() => {
    if (searchInput.trim()) {
      const filtered = searchSuggestion.filter(
        (item) =>
          typeof item.text === "string" &&
          item.text.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
  }, [searchInput, searchSuggestion]);

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setShowDropdown(false);
    navigate(`/search/book`);
  };

  return (
    <div className="w-full py-4 px-6 font-sans bg-white shadow-sm relative">
      <nav className="flex justify-between items-center border-b border-gray-200 pb-3">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">BookStore</Link>
        </div>

        <ul className="flex gap-6 text-base text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-blue-600">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-600">
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        <div className="relative flex items-center gap-4">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowDropdown(false);
                  navigate(`/search/book`);
                }
              }}
              placeholder="Search"
              className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none"
            />

            {/* Suggestion dropdown */}
            {showDropdown && filteredSuggestions.length > 0 && (
              <ul className="absolute z-20 bg-white border border-gray-300 mt-1 rounded shadow w-full max-h-40 overflow-y-auto text-sm">
                {filteredSuggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(item.text)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart */}
          <FaShoppingCart className="text-xl text-gray-700 cursor-pointer" />

          {/* Auth actions */}
          {!user ? (
            <>
              <Link to="/login" className="text-sm hover:underline text-blue-600">Login</Link>
              <Link to="/register" className="text-sm hover:underline text-blue-600">Register</Link>
            </>
          ) : (
            <>
              <p onClick={logout} className="cursor-pointer text-sm hover:underline text-blue-600">Logout</p>
              <Link to="/profile">
                <FaUserCircle className="text-2xl text-gray-700 hover:text-blue-600" />
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
