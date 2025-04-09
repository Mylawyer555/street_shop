import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart(); // cart item count

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkClass = ({ isActive }) =>
    `relative py-2 hover:text-amber-500 transition-colors duration-200 ${
      isActive
        ? "text-amber-500 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:transition-all"
        : "text-black"
    }`;

  return (
    <nav>
      {/* Top banner */}
      <div className="w-full bg-black text-white text-sm px-4 py-2 flex items-center justify-center text-center">
        <p className="max-w-screen-md w-full leading-snug">
          Summer Sales For All Jackets and Free Express Delivery - <strong>50% OFF</strong>
          <a href="#all-products" className="underline ml-2 text-amber-400 hover:text-amber-500">
            Shop Now
          </a>
        </p>
      </div>

      {/* Main navbar */}
      <div className="w-full h-[70px] shadow-xl bg-white flex items-center justify-between px-5 md:px-[100px]">
        {/* Logo */}
        <div className="w-full md:w-[30%] flex items-center">
          <NavLink to="/" className="sm:text-lg md:text-xl lg:text-2xl font-bold text-black">
            <img
              width={150}
              height={50}
              src="/Yellow_Black_Brush_Streetwear_Brand_Logo-removebg-preview.png"
              alt="logo"
              className="object-cover"
            />
          </NavLink>
        </div>

        {/* Nav links and search */}
        <div className="hidden md:flex items-center justify-between w-[60%]">
          <ul className="flex items-center gap-10 text-[16px]">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
            <li><NavLink to="/signup" className={navLinkClass}>SignUp</NavLink></li>
          </ul>

          {/* Search bar */}
          <div className="w-[220px] h-[40px] bg-[whitesmoke] flex items-center justify-center rounded-sm">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded w-[190px] h-[40px] placeholder:text-[12px] text-stone-700 font-normal"
            />
            <div
              className="w-[30px] h-[100%] flex items-center justify-center cursor-pointer"
              onClick={handleSearch}
            >
              <IoIosSearch className="w-[25px] h-[25px] text-[14px] text-gray-950" />
            </div>
          </div>
        </div>

        {/* Cart & Wishlist Icons - Always visible */}
        <div className="flex items-center gap-4 ml-4 relative">
          <NavLink to="/wishlist">
            <IoIosHeartEmpty className="w-6 h-6 text-gray-950" />
          </NavLink>

          <NavLink to="/cart" className="relative">
            <MdOutlineShoppingCart className="w-6 h-6 text-gray-950" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          {/* Mobile Hamburger */}
          <div className="md:hidden ml-3">
            <GiHamburgerMenu
              onClick={toggleMenu}
              className="text-xl text-black cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav menu */}
      {isMenuOpen && (
        <div className="w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center py-5 text-[16px] gap-2">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
            <li><NavLink to="/signup" className={navLinkClass}>SignUp</NavLink></li>

            {/* Search bar on mobile */}
            <div className="w-[220px] h-[40px] bg-[whitesmoke] flex items-center justify-center rounded-sm mt-4">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded w-[190px] h-[40px] placeholder:text-[12px] text-stone-700 font-normal"
              />
              <div
                className="w-[30px] h-[100%] flex items-center justify-center cursor-pointer"
                onClick={handleSearch}
              >
                <IoIosSearch className="w-[25px] h-[25px] text-[14px] text-gray-950" />
              </div>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
