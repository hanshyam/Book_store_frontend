import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import { BookContext } from "../context/bookContext";

const Header = () => {
  // fake auth state example
  const {searchInput,setSearchInput} = useContext(BookContext);
  const {user,logout} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-full py-4 px-6 font-sans bg-white shadow-sm">
      <nav className="flex justify-between items-center border-b border-gray-200 pb-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">BookStore</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-base text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-blue-600">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-600">
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <input
            type="text"
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                navigate(`/search/book`);
              }
            }}
            placeholder="Search"
            className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none"
          />

          {/* Cart Icon */}
          <FaShoppingCart className="text-xl text-gray-700 cursor-pointer" />

          {/* Auth Links or Profile */}
          {!user ? (
            <>
              <Link to="/login" className="text-sm hover:underline text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-sm hover:underline text-blue-600">
                Register
              </Link>
            </>
          ) : (
            <>
            <p onClick={logout} className="cursor-pointer text-sm hover:underline text-blue-600">
              Logout
            </p>
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
