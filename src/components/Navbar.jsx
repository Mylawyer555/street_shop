import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import AllProducts from "./AllProducts";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 hover:text-amber-500 transition-colors duration-200 ${
      isActive
        ? "text-amber-500 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:transition-all"
        : "text-black"
    }`;

  return (
    <nav>
      <div className="w-full bg-black text-white text-sm px-4 py-2 flex items-center justify-center text-center">
        <p className="max-w-screen-md w-full leading-snug">
          Summer Sales For All Jackets and Free Express Delivery - <strong>50% OFF</strong>
          <a href="#all-products" className="underline ml-2 text-amber-400 hover:text-amber-500">
            Shop Now
          </a>
        </p>
      </div>

      <div className="w-full h-[70px] shadow-xl bg-white flex items-center justify-between px-5 md:px-[100px]">
        <div className="w-full md:w-[30%] flex items-center">
          <NavLink to={`/`} className="sm:text-lg md:text-xl lg:text-2xl font-bold text-black">
            <img
              width={150}
              height={50}
              src="/Yellow_Black_Brush_Streetwear_Brand_Logo-removebg-preview.png"
              alt="logo"
              className="object-cover"
            />
          </NavLink>
        </div>

        <div className="w-[60%] hidden md:flex items-center justify-between">
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

          <div className="flex items-center">
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

            <div className="w-[100px] h-[40px] flex items-center justify-center gap-3.5">
              <IoIosHeartEmpty className="w-[25px] h-[25px] text-gray-950" />
              <MdOutlineShoppingCart className="w-[20px] h-[20px] text-gray-950" />
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <GiHamburgerMenu
            onClick={toggleMenu}
            className="text-xl text-black cursor-pointer"
          />
        </div>
      </div>

      {isMenuOpen && (
        <div className="w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center py-5 text-[16px]">
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
