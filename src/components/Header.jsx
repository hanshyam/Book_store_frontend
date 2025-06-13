import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import { BookContext } from "../context/bookContext";

const Header = () => {
  const { searchInput, setSearchInput } = useContext(BookContext);
  const { user, logout, searchSuggestion, getSearchSuggestions } = useContext(AuthContext);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput.trim()) {
      getSearchSuggestions();
      const filtered = searchSuggestion.filter((item) =>
        item.text.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
  }, [searchInput, getSearchSuggestions, searchSuggestion]);

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setShowDropdown(false);
    navigate(`/search/book`);
  };

  return (
    <div className="w-full py-4 px-6 font-sans bg-white shadow-sm relative">
      <nav className="flex justify-between items-center border-b border-gray-200 pb-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">BookStore</Link>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-base text-gray-700 font-medium">
          <li className="hover:text-blue-600">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        {/* Search + Actions */}
        <div className="relative hidden md:flex items-center gap-4">
          {/* Search Box */}
          <div className="relative w-60">
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
              className="w-full px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none"
            />

            {/* Suggestion Dropdown */}
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

          <FaShoppingCart className="text-xl text-gray-700 cursor-pointer" />

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

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-3 text-gray-700">
          <Link to="/" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/admin" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Admin</Link>

          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setMenuOpen(false);
                  setShowDropdown(false);
                  navigate(`/search/book`);
                }
              }}
              placeholder="Search"
              className="w-full px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none"
            />
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

          <FaShoppingCart className="text-xl text-gray-700 cursor-pointer" />

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
      )}
    </div>
  );
};

export default Header;
