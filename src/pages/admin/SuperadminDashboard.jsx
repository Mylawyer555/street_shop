import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSpeaker } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { ChevronDown, LayoutGrid, ShoppingCart, Users, BarChart2, Settings, ChartScatter, ChartBar, SpeakerIcon, Speaker } from "lucide-react";
import { GiClothes } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

export default function SuperAdminDashboardLayout() {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
    const { user } = useAuth(); // Assuming you have a user object in your AuthContext

    const handleLogout = () => {
        // Implement your logout logic here
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/"; // Redirect to login page
    }

   


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shadow-lg flex-shrink-0 hidden md:flex flex-col justify-between">
        <div>
          <div className="px-6 py-4 border-b border-gray-200">
            <img src="/logo.svg" alt="Admin Logo" className="w-32" />
          </div>
          <nav className="p-4 space-y-2 text-sm">
            <NavLink to="overview" className="block py-2 px-4 rounded hover:bg-gray-100">
              <LayoutGrid className="inline mr-2" /> Overview
            </NavLink>
            <NavLink to="orders" className="block py-2 px-4 rounded hover:bg-gray-100">
              <TbListDetails className="inline mr-2" /> Orders
            </NavLink>

            {/* Products Section */}
            <div>
              <button
                onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                className="flex items-center w-full py-2 px-4 rounded hover:bg-gray-100"
              >
                <GiClothes className="inline mr-2" /> Products <ChevronDown className="ml-auto" size={16} />
              </button>
              {isProductMenuOpen && (
                <div className="ml-6 space-y-2">
                  <NavLink to="products/inventory" className="block py-1 px-2 rounded hover:bg-gray-100">
                    Inventory
                  </NavLink>
                  <NavLink to="products/create" className="block py-1 px-2 rounded hover:bg-gray-100">
                    Create Product
                  </NavLink>
                  <NavLink to="products/discount" className="block py-1 px-2 rounded hover:bg-gray-100">
                    Discount
                  </NavLink>
                  <NavLink to="products/catalog" className="block py-1 px-2 rounded hover:bg-gray-100">
                    Catalog
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="customers" className="block py-2 px-4 rounded hover:bg-gray-100">
              <Users className="inline mr-2" /> Customers
            </NavLink>
            <NavLink to="analytics" className="block py-2 px-4 rounded hover:bg-gray-100">
              <BarChart2 className="inline mr-2" /> Analytics
            </NavLink>
            <NavLink to="notifications" className="block py-2 px-4 rounded hover:bg-gray-100">
              <FaBell className="inline mr-2" /> Notifications
            </NavLink>
            <NavLink to="notifications" className="block py-2 px-4 rounded hover:bg-gray-100">
              <Speaker className="inline mr-2" /> Marketing
            </NavLink>
            <NavLink to="notifications" className="block py-2 px-4 rounded hover:bg-gray-100">
              <ChartBar className="inline mr-2" /> Finances
            </NavLink>
            <NavLink to="notifications" className="block py-2 px-4 rounded hover:bg-gray-100">
              <Settings className="inline mr-2" /> Settings
            </NavLink>
          </nav>
        </div>
        <div className="p-4">
          <button className="flex items-center py-2 px-4 rounded hover:bg-gray-100 w-full">
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <img src="/logo.svg" alt="Logo" className="w-24 md:hidden" />
            <div className="relative w-full max-w-md">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaBell className="text-gray-600 text-xl cursor-pointer" />
            <span className="hidden md:block text-sm font-medium text-gray-700"> Welcome, {user.fullName?.split(" ")[0]}</span>
            <FaUserCircle className="text-3xl text-gray-500" />
          </div>
        </header>

        {/* Main Section */}
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
