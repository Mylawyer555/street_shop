import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage the dropdown visibility
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Assuming you have a logout function

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-amber-400 font-bold" : "text-gray-700";

  const handleLogout = () => {
    logout(); // Assuming you have a logout function in your AuthContext
    navigate("/login"); // Redirect user to the login page after logout
  };

  return (
    <nav className="w-full h-[70px] bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl h-full mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center w-[150px] h-[60px]">
          <img
            src="/Yellow_Black_Brush_Streetwear_Brand_Logo-removebg-preview.png"
            alt="logo"
            width={100}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 text-sm font-medium">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
          </ul>

          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 w-[180px] text-sm outline-none bg-transparent"
            />
            <button
              onClick={handleSearch}
              className="px-2.5 py-3 bg-gray-200 hover:bg-gray-300 transition"
            >
              <IoIosSearch className="text-gray-800" />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <NavLink to="/wishlist">
              <IoIosHeartEmpty className="text-xl text-gray-800" />
            </NavLink>
            <CartIcon />

            {/* Show profile and dropdown only when user is logged in */}
            {user ? (
              <div className="relative flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {user.fullName?.split(" ")[0]}
                </span>
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <img
                    src={user.profilePicture || "/profile.png"}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md text-sm text-gray-700 p-2">
                      <NavLink
                        to="/account"
                        className="block py-2 px-4 hover:bg-gray-100"
                      >
                        My Account
                      </NavLink>
                      <NavLink
                        to="/switch-account"
                        className="block py-2 px-4 hover:bg-gray-100"
                      >
                        Switch Account
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 px-4 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 border-t shadow-md space-y-4">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <div className="flex gap-4 pt-2">
            <NavLink to="/wishlist">
              <IoIosHeartEmpty className="text-xl" />
            </NavLink>
            <NavLink to="/cart">
              <MdOutlineShoppingCart className="text-xl" />
            </NavLink>
          </div>
          {user ? (
            <div className="text-sm font-medium text-gray-700">
              Welcome, {user.fullName?.split(" ")[0]}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
