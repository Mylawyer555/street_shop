import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser } from "react-icons/fi"; 
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [input, setInput] = useState(searchQuery || ''); 

  
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearchQuery(value); // Update the search query in context
  };


  const { handleSearch } = useSearch();

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
          Summer Sales For All Jackets and Free Express Delivery -{" "}
          <strong>50% OFF</strong>
          <a
            href="#all-products"
            className="underline ml-2 text-amber-400 hover:text-amber-500"
          >
            Shop Now
          </a>
        </p>
      </div>

      {/* Main navbar */}
      <div className="w-full h-[70px] shadow-xl bg-white flex items-center justify-between px-5 md:px-[100px]">
        {/* Logo */}
        <div className="w-full md:w-[30%] flex items-center">
          <NavLink
            to="/"
            className="sm:text-lg md:text-xl lg:text-2xl font-bold text-black"
          >
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
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={navLinkClass}>
                SignUp
              </NavLink>
            </li>
          </ul>

          {/* Search bar */}
          <div className="w-[220px] h-[40px] bg-[whitesmoke] flex items-center justify-center rounded-sm">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={handleChange}
              className="p-2 rounded w-[190px] h-[40px] outline-none placeholder:text-[12px] text-stone-700 font-normal"
            />
            <div
              className="w-[30px] h-[100%] flex items-center justify-center cursor-pointer"
              onClick={handleSearch}
            >
              <IoIosSearch className="w-[25px] h-[25px] text-[14px] text-gray-950" />
            </div>
          </div>
        </div>

        {/* Icons section */}
        <div className="flex items-center gap-4 ml-4 relative">
          {/* Wishlist */}
          <NavLink to="/wishlist">
            <IoIosHeartEmpty className="w-6 h-6 text-gray-950" />
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <MdOutlineShoppingCart className="w-6 h-6 text-gray-950" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          {/*profile Icon */}
          <NavLink to="/profile">
            <FiUser className="w-6 h-6 text-gray-950" />
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

      {/* mobile search bar */}
      <div className="w-full h-[60px] flex items-center justify-center md:hidden px-4">
        <div className="w-full h-[40px] bg-zinc-100 flex items-center gap-2.5 shadow-xl rounded-[25px] max-w-md">
          <div className="input w-[80%]">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-bl-full rounded-tl-full py-2 px-5 bg-zinc-100 outline-none text-[12px] text-[#333] placeholder:text-[#929292]"
              placeholder="Search clothes, shoes, etc."
            />
          </div>
          <div
            className="search-btn w-[20%] h-[30px] border-l border-l-zinc-200 flex items-center justify-center cursor-pointer"
            onClick={handleSearch}
          >
            <BiSearch className="text-[20px] text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Mobile nav menu */}
      {isMenuOpen && (
        <div className="w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center py-5 text-[16px] gap-2">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={navLinkClass}>
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </li>

            {/* Mobile search */}
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
