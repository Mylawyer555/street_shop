import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { fetchProductList } from "../services/productService";
import { Link } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Loader from "./Loaders";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");


  useEffect(() => {
    (async () => {
      try {
        const items = await fetchProductList();
        setProducts(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;
  if (products.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">No products found</div>
    );

  // Extract unique categories and brands
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const brands = ["All", ...new Set(products.map((p) => p.brand))];

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
    return matchCategory && matchBrand;
  });


  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto px-4 py-6">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full bg-white px-4 py-4 mb-6 gap-4 ">
        <h2 className="text-xl font-bold border-l-4 border-black pl-2">
          Top Products
        </h2>

        <div className="flex items-center flex-col sm:flex-row gap-4">
           <h4>Gender</h4>
            
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <h4>Brand</h4>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full bg-white px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="bg-white p-3 rounded-lg hover:shadow-lg transition duration-300 flex flex-col"
          >
            <Link to={`/products/${p._id}`}>
              <img
                src={p.images?.[0] || "/placeholder.jpg"}
                alt={p.name}
                className="w-full 
                    h-[180px]        /* small devices (default) */
                    sm:h-[220px]     /* from sm: 640px up */
                    md:h-[250px]     /* from md: 768px up */
                    object-cover "
              />
            </Link>

            <div className="flex flex-col justify-between flex-grow mt-3 gap-1">
              <Link to={`/products/${p._id}`}>
                <p className="text-gray-700 text-sm font-medium">{p.name}</p>
              </Link>
              <div className="flex items-center justify-between mt-2">
                <h4 className="text-sm md:text-lg font-bold text-black">
                  {p.price.toLocaleString("en-NG", {
                    currency: "NGN",
                    style: "currency",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </h4>
                {/* <button
                  onClick={() => addToCart(p)}
                  className="p-1 md:p-2 border-2 border-black rounded-full hover:bg-gray-100 transition"
                >
                  <MdOutlineAddShoppingCart className="text-black text-xl" />
                </button> */}
                <div className="addtocart w-[50px] h-[50px] flex items-center justify-center rounded-[8px] bg-white hover:bg-gray-100 transition duration-300 cursor-pointer">
                  <MdOutlineAddShoppingCart
                    className="text-black text-xl cursor-pointer"
                    onClick={() => addToCart(p)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No products match your filter.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
