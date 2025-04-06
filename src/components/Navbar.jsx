import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger icon for mobile menu

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu
  const navigate = useNavigate(); // To navigate to the search results page

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect to the search results page with the query as a parameter
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the visibility of the mobile menu
  };

  return (
    <nav>
      {/* Announcement Bar */}
      <div className="w-full h-[40px] bg-black flex items-center justify-center">
        <div className="w-[70%] h-[100%] flex items-center justify-center">
          <p className="text-white">
            Summer Sales For All Jackets and Free Express Delivery-50OFF{" "}
            <Link to="/shop" className="font-light underline ml-5">
              Shop Now
            </Link>
          </p>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full h-[70px] shadow-xl bg-white flex items-center justify-between px-5 md:px-[100px]">
        {/* Logo */}
        <div className="w-full md:w-[30%] flex items-center">
          <Link to="/" className="sm:text-lg md:text-xl lg:text-2xl font-bold text-black">
            <img
              width={150}
              height={50}
              src="/Yellow_Black_Brush_Streetwear_Brand_Logo-removebg-preview.png"
              alt="logo"
              className="object-cover"
            />
          </Link>
        </div>

        {/* Desktop View - Links and Search */}
        <div className="w-[60%] hidden md:flex items-center justify-between">
          <ul className="flex items-center gap-10 text-[16px]">
            <li>
              <Link to="/" className="text-black hover:text-amber-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-black hover:text-amber-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black hover:text-amber-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-black hover:text-amber-500">
                SignUp
              </Link>
            </li>
          </ul>

          {/* Search bar */}
          <div className="flex items-center">
            <div className="w-[220px] h-[40px] bg-[whitesmoke] flex items-center justify-center rounded-sm">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                className="p-2 rounded w-[190px] h-[40px] placeholder:text-[12px] text-stone-700 font-normal"
              />
              <div
                className="w-[30px] h-[100%] flex items-center justify-center cursor-pointer"
                onClick={handleSearch} // Trigger search on click
              >
                <IoIosSearch className="w-[25px] h-[25px] text-[14px] text-gray-950" />
              </div>
            </div>

            {/* Wishlist and Cart icons */}
            <div className="w-[100px] h-[40px] flex items-center justify-center gap-3.5">
              <IoIosHeartEmpty className="w-[25px] h-[25px] text-gray-950" />
              <MdOutlineShoppingCart className="w-[20px] h-[20px] text-gray-950" />
            </div>
          </div>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="md:hidden flex items-center">
          <GiHamburgerMenu
            onClick={toggleMenu}
            className="text-xl text-black cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center py-5 text-[16px]">
            <li>
              <Link to="/" className="block py-2 text-black hover:text-amber-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 text-black hover:text-amber-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-black hover:text-amber-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/signup" className="block py-2 text-black hover:text-amber-500">
                SignUp
              </Link>
            </li>

            {/* Search in mobile */}
            <div className="w-[220px] h-[40px] bg-[whitesmoke] flex items-center justify-center rounded-sm mt-4">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                className="p-2 rounded w-[190px] h-[40px] placeholder:text-[12px] text-stone-700 font-normal"
              />
              <div
                className="w-[30px] h-[100%] flex items-center justify-center cursor-pointer"
                onClick={handleSearch} // Trigger search on click
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
