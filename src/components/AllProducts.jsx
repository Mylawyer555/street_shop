import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiHeart } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import Loader from './Loaders';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProductsCount, setVisibleProductsCount] = useState(8); // Initial number of visible products
  const [hasMore, setHasMore] = useState(true); // To track if there are more products to load

  const productsPerPage = 8; // Number of products to load per page

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${BASE_URL}/products`);

        if (response.data.length === 0) {
          setHasMore(false); // If there are no products
        } else {
          setProducts(response.data); // Store the fetched products
        }
      } catch (error) {
        console.error(error);
        setError(`An error occurred while fetching products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Fetch data on component mount

  // Handle "Load More" button click
  const loadMore = () => {
    const newVisibleCount = visibleProductsCount + productsPerPage;
    setVisibleProductsCount(newVisibleCount);

    // Disable "Load More" if all products are displayed
    if (newVisibleCount >= products.length) {
      setHasMore(false); // No more products to load
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="mt-10 w-full p-5">
      <div className="border-l-8 border-l-amber-500 ml-5">
        <h2 className="text-xl font-bold ml-5">Our products</h2>
      </div>
      <div className="ml-5 mt-2.5">
        <h2 className="text-4xl font-bold ml-7">Browse all Products</h2>
      </div>

      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center mt-10 mx-auto">
        {/* Display only the number of products based on visibleProductsCount */}
        {products.slice(0, visibleProductsCount).map((product) => (
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1 }}
            className="w-full max-w-[320px] h-[350px] border border-[whitesmoke] rounded-lg bg-white p-3"
            key={product.id}
          >
            {/* Image Container with Hover Effect */}
            <motion.div
              className="relative w-full h-52 bg-gray-100 rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product.image}
                alt="product"
                className="w-full h-full object-cover"
              />

              {/* Icons (Wishlist & Quick View) */}
              <div className="flex items-center justify-center absolute top-1.5 right-1 w-[30px] h-[30px] rounded-full bg-white">
                <BiHeart className="hover:text-amber-500" />
              </div>
              <div className="flex items-center justify-center absolute top-10 right-1 w-[30px] h-[30px] rounded-full bg-white">
                <IoEyeOutline className="hover:text-amber-500" />
              </div>
            </motion.div>

            {/* Product Details */}
            <div className="mt-3">
              {/* Wrap the product title in a Link to the product detail page */}
              <Link to={`/product/${product.id}`}>
                <p className="text-[17px] font-semibold">
                  {product.title.length > 20 ? product.title.substring(0, 20) : product.title}
                </p>
              </Link>
              <p className="text-[14px] text-black font-bold">${product.price}</p>

              {/* Add to Cart Button (Animated) */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "orange" }}
                whileTap={{ scale: 0.9 }}
                className="bg-black text-white w-full h-[40px] rounded-[10px] mt-4 transition-all duration-300"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "orange" }}
            whileTap={{ scale: 0.9 }}
            onClick={loadMore} // Load more products on click
            className="px-6 py-2 bg-white text-black rounded-md border border-black hover:border-none"
          >
            Load More
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
