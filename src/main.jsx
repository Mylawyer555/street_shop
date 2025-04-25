import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SearchResultsPage from "./pages/SearchResultPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cartpage.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import InputField from "./components/InputFields.jsx";
import UserRegistrationPage from "./pages/UserRegistrationPage.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import UserDashboard from "./pages/DashboardPage.jsx";
import AdminDashboardLayout from "./pages/admin/AdminDashboard.jsx";
import SuperAdminDashboardLayout from "./pages/admin/SuperadminDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/search",
    element: <SearchResultsPage />,
  },
  {
    path: "/register",
    element: <UserRegistrationPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard/>
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboardLayout/>
  },
  {
    path: "/superadmin-dashboard",
    element: <SuperAdminDashboardLayout/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={1000} />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
