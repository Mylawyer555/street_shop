import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loaders";
import ProductCard from "./ProductCard";
import ProductPreviewModal from "./ProductPreviewModal";
import { useSearch } from "../context/SearchContext";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { searchQuery } = useSearch();

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        setProducts(data);
        setFilteredProducts(data);
      } catch {
        setError("Error loading products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let updated = [...products];

    // Handle category selection
    if (selectedCategory) {
      updated = updated.filter((product) => product.category === selectedCategory);
    }

    // Handle search query
    if (searchQuery && typeof searchQuery === "string" && searchQuery.trim()) {
      updated = updated.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Update filtered products
    setFilteredProducts(updated);
  }, [searchQuery, selectedCategory, products]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (loading) return <div className="w-full h-full flex items-center justify-center"><Loader /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <section id="all-products" className="mt-10 w-full p-5">
      {/* Categories */}
      <div className="categories w-auto flex items-center justify-center gap-3 mb-8 overflow-x-auto hide-scrollbar">
        <div
          className={`w-auto h-[30px] rounded-[8px] flex shrink-0 items-center justify-center p-2.5 cursor-pointer 
            ${selectedCategory === null ? "bg-amber-500 text-white" : "bg-zinc-100 text-[#333]"}`}
          onClick={() => handleCategorySelect(null)}
        >
          <p className="font-normal">All Products</p>
        </div>

        {categories.map((category) => (
          <div
            key={category}
            className={`w-auto h-[30px] rounded-[8px] flex shrink-0 items-center justify-center p-2.5 cursor-pointer 
              ${selectedCategory === category ? "bg-amber-500 text-white" : "bg-zinc-100 text-[#333]"}`}
            onClick={() => handleCategorySelect(category)}
          >
            <p className="font-normal">{category}</p>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPreview={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-6">No products found</div>
      )}

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

      {selectedProduct && (
        <ProductPreviewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default AllProducts;
