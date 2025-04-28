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
import Unauthorized from "./pages/Unauthorized";
import UserList from "./pages/admin/UserList";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminOverview from "./pages/admin/AdminOverview";
import ViewUserProfile from "./pages/admin/ViewUserProfile";
import AddProduct from "./pages/admin/CreateProductForm";
import InventoryPage from "./pages/admin/InventoryPage";
import CatalogPage from "./pages/admin/CatalogPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import UserProfile from "./pages/user/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/unauthorized", // 👈 add this route
    element: <Unauthorized />,
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
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },

  // admin routes
  {
    element: <ProtectedRoutes allowedRoles={["admin", "superadmin"]} />,
    children: [
      {
        path: "/superadmin-dashboard",
        element: <SuperAdminDashboardLayout />,
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "users", element: <UserList /> },
          { path: "users/:id", element: <ViewUserProfile /> },
          {
            path: "products",
            children: [
              { path: "inventory", element: <InventoryPage /> },
              { path: "create-product", element: <AddProduct /> },
              { path: "catalog", element: <CatalogPage /> },
            ],
          },
          {path: "analytics", element: <AnalyticsPage />},

          // add more nested admin pages here
        ],
      },
    ],
  },
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
