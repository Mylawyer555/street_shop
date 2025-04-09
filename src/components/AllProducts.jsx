import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loaders";
import ProductCard from "./ProductCard";
import ProductPreviewModal from "./ProductPreviewModal";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category

  const loadMore = () => {
    setVisibleCount(prev => prev + 8); // Load 8 more products
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const BASE_URL = "https://fakestoreapi.com"; // Use your API base URL
        const { data } = await axios.get(`${BASE_URL}/products`);
        setProducts(data);
        setFilteredProducts(data); // Initially show all products
      } catch (err) {
        setError("Error loading products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category) {
      // Filter products based on selected category
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    } else {
      // Show all products if no category selected
      setFilteredProducts(products);
    }
  };

  if (loading) 
    return  <div className="w-full h-full flex items-center justify-center"><Loader /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <section id="all-products" className="mt-10 w-full p-5">
      
      {/* Category filters */}
      <div className="categories w-auto flex items-center justify-start gap-3 mb-8 overflow-x-auto hide-scrollbar">
        {/* "All Products" first */}
        <div 
          className={`w-auto h-[30px] rounded-[8px] flex shrink-0 items-center justify-center p-2.5 cursor-pointer 
            ${selectedCategory === null ? "bg-amber-500 text-white" : "bg-zinc-100 text-[#333]"}
            hover:bg-amber-400 hover:text-white transition-all`}
          onClick={() => handleCategorySelect(null)}
        >
          <p className="font-normal">All Products</p>
        </div>

        {/* Dynamic Categories */}
        {categories.map((category) => (
          <div
            key={category}
            className={`w-auto h-[30px] rounded-[8px] flex shrink-0 items-center justify-center p-2.5 cursor-pointer 
              ${selectedCategory === category ? "bg-amber-500 text-white" : "bg-zinc-100 text-[#333]"}
              hover:bg-amber-400 hover:text-white transition-all`}
            onClick={() => handleCategorySelect(category)}
          >
            <p className="font-normal">{category}</p>
          </div>
        ))}
      </div>

      {/* Products display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPreview={() => setSelectedProduct(product)} // Set selected product for modal
          />
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
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
    </section>
  );
};

export default AllProducts;
