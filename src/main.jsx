import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SearchResultsPage from "./pages/SearchResultPage.jsx";
import JewelryCategory from "./components/JewelryCategory.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cartpage.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";



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
    path: "/category/jewwlery",
    element: <JewelryCategory />,
  },
  {
    path: "/cart",
    element: <Cart/>
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={1000}/>
        </CartProvider>
    </SearchProvider>
  </StrictMode>
);
