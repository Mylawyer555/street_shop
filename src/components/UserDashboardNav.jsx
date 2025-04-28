import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoIosHeartEmpty } from 'react-icons/io';
import { useState } from 'react';

const UserDashboardNavbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full h-[70px] bg-white shadow flex items-center justify-between px-5 md:px-10">
      {/* Logo */}
      <div className=" w-[150px] h-full text-xl font-bold text-gray-800 border flex items-center justify-start ">
        <NavLink to="/">
           <h2 className='font-bold'>Admin Panel</h2>
        </NavLink>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</NavLink>
        <NavLink to="/cart" className="relative text-gray-700 hover:text-blue-600">
          <MdOutlineShoppingCart size={24} />
        </NavLink>
        <NavLink to="/wishlist" className="text-gray-700 hover:text-blue-600">
          <IoIosHeartEmpty size={24} />
        </NavLink>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FaUserCircle size={24} />
            {user?.name && <span className="hidden md:inline">{user.name}</span>}
          </button>
          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-lg py-2 px-4 w-48">
              <NavLink to="/profile" className="block py-1 hover:text-blue-600">Profile</NavLink>
              <NavLink to="/account" className="block py-1 hover:text-blue-600">Account Settings</NavLink>
              <button onClick={logout} className="block py-1 w-full text-left hover:text-red-500">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden flex items-center gap-4">
        <NavLink to="/cart">
          <MdOutlineShoppingCart size={24} />
        </NavLink>
        <NavLink to="/wishlist">
          <IoIosHeartEmpty size={24} />
        </NavLink>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaUserCircle size={24} />
        </button>
      </div>
    </nav>
  );
};

export default UserDashboardNavbar;
