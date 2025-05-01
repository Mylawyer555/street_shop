import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";
import {
  ChevronDown,
  LayoutGrid,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
} from "lucide-react";
import { GiClothes } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";

export default function SuperAdminDashboardLayout() {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle sidebar on mobile
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to login page
  };

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`w-64 shadow-lg flex-shrink-0 md:flex flex-col  ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div>
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-3xl font-sans font-bold">Admin Panel</h2>
          </div>
          <nav className="p-4 space-y-2 text-sm">
            <NavLink
              to="/superadmin-dashboard"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive
                    ? "bg-gray-200 text-gray-800 border-l-4 border-l-gray-900"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <LayoutGrid className="inline mr-2" id="admin_icon" /> Overview
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive
                    ? "bg-gray-200 text-gray-800 border-l-4 border-l-gray-900"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <TbListDetails className="inline mr-2" id="admin_icon" /> Orders
            </NavLink>

            {/* Products Section */}
            <div>
              <button
                onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                className="flex items-center w-full py-2 px-4 rounded hover:bg-gray-100"
              >
                <GiClothes className="inline mr-2" id="admin_icon" /> Products{" "}
                <ChevronDown className="ml-auto" size={16} />
              </button>
              {isProductMenuOpen && (
                <div className="ml-6 space-y-2">
                  <NavLink
                    to="/superadmin-dashboard/products/inventory"
                    className={({ isActive }) =>
                      `block py-1 px-2 rounded ${
                        isActive
                          ? "bg-gray-200 text-gray-800 border-l-4 border-l-gray-900"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    Inventory
                  </NavLink>
                  <NavLink
                    to="/superadmin-dashboard/products/create-product"
                    className={({ isActive }) =>
                      `block py-1 px-2 rounded ${
                        isActive
                          ? "bg-gray-200 text-gray-800"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    Create Product
                  </NavLink>

                  <NavLink
                    to="/superadmin-dashboard/products/catalog"
                    className={({ isActive }) =>
                      `block py-1 px-2 rounded ${
                        isActive
                          ? "bg-gray-200 text-gray-800"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    Catalog
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/superadmin-dashboard/users"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive
                    ? "bg-gray-200 text-gray-800 border-l-4 border-l-gray-900"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Users className="inline mr-2 " id="admin_icon" /> Customers
            </NavLink>
            <NavLink
              to="/superadmin-dashboard/analytics"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-gray-200 text-gray-800" : "hover:bg-gray-100"
                }`
              }
            >
              <BarChart2 className="inline mr-2" id="admin_icon" /> Analytics
            </NavLink>
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-gray-200 text-gray-800" : "hover:bg-gray-100"
                }`
              }
            >
              <FaBell className="inline mr-2" id="admin_icon" /> Notifications
            </NavLink>
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-gray-200 text-gray-800" : "hover:bg-gray-100"
                }`
              }
            >
              <Settings className="inline mr-2" id="admin_icon" /> Settings
            </NavLink>
          </nav>
        </div>
        <div className="p-4 ">
          <button
            onClick={handleLogout}
            className="flex items-center py-2 px-4 rounded hover:bg-gray-100 w-full"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Mobile Menu */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-4 text-xl"
        >
          <FiMenu />
        </button>
        {/* Navbar */}
        <header className="flex items-center justify-end p-4 border-b border-gray-200 bg-white shadow-sm">
          {/* <div className="relative w-full max-w-md border">
            
          </div> */}

          <div className="flex items-center gap-4 ">
           
            <span className="text-sm md:text-md  font-medium text-slate-700">
              {getGreeting()}, {user.fullName?.split(" ")[0]}
            </span>
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
