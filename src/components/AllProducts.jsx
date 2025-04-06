import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loaders";
import ProductCard from "./ProductCard";
import ProductPreviewModal from "./ProductPreviewModal";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal state

  const loadMore = () => {
    setVisibleCount(prev => prev + 8); // Load 8 more products
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const BASE_URL = "https://fakestoreapi.com"; // Use your API base URL
        const { data } = await axios.get(`${BASE_URL}/products`);
        setProducts(data);
      } catch (err) {
        setError("Error loading products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="mt-10 w-full p-5">
      <h2 className="w-[80%] text-4xl font-bold ml-7">Browse all Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {products.slice(0, visibleCount).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onPreview={() => setSelectedProduct(product)} // Set selected product for modal
          />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-black text-white rounded-md"
          >
            Load More
          </button>
        </div>
      )}

      {/* Show product preview modal when selected */}
      {selectedProduct && (
        <ProductPreviewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)} // Close modal
        />
      )}
    </div>
  );
};

export default AllProducts;
