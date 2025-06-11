import React from "react";

const Header = ()=>{
    return(
       <div className="w-full py-5 font-sans">
         <nav className="flex justify-between items-center pb-2 border-b border-gray-200">
            <div className="text-2xl font-bold">BookStore</div>
            <ul className="flex gap-5">
              <li className="cursor-pointer text-base">New Releases</li>
              <li className="cursor-pointer text-base">Bestsellers</li>
              <li className="cursor-pointer text-base">Genres</li>
              <li className="cursor-pointer text-base">Authors</li>
              <li className="cursor-pointer text-base">Deals</li>
            </ul>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none"
              />
              <span className="text-xl cursor-pointer">🛒</span>
            </div>
          </nav>
       </div>
    );
}

export default Header;