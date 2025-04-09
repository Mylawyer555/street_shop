import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiHeart } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';
import axios from 'axios';

import Loader from './Loaders';
import ProductPreviewModal from "./ProductPreviewModal";
import { Link } from 'react-router-dom';
import {DrawOutlineButton} from '../components/Button'

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const BestSelling = () => {
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
        console.log(data)
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
      <div className="border-l-8 border-l-amber-500 ml-5">
        <h2 className="text-xl font-bold ml-5">Best Selling Products</h2>
      </div>

      {/* Product Layout with horizontal scrolling and hidden scrollbar */}
      <div className="w-full flex overflow-x-auto gap-5 justify-center mt-10 mx-auto hide-scrollbar">
        {products.slice(0, visibleCount).map(product => (
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1 }}
            className="w-full  max-w-[320px] lg:max-w-[250px] mx-auto rounded-lg bg-white p-3 flex-shrink-0"
            key={product.id}
            product={product}
            onPreview={() => setSelectedProduct(product)} 
          >
            {/* Image Container with Hover Effect */}
            <motion.div
              className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product.image}
                alt="product"
                className="w-full h-full object-cover"
              />

              {/* Add to Cart Button (Animated on Hover for Desktop) */}
              <motion.button
                  initial={{ y: 20, opacity: 0 }}  // Start from below
                  whileHover={{ y: 0, opacity: 1 }} // Move upwards on hover
                  transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 left-0 bg-black text-white w-[100%] h-[40px]  shadow-md 
                          hidden md:block group-hover:block"
              >
                Add to Cart
              </motion.button>

              {/* Icons (Wishlist & Quick View) */}
              <div className="flex items-center justify-center absolute top-1.5 right-1 w-[30px] h-[30px] rounded-full bg-white">
                <BiHeart className="hover:text-amber-500" />
              </div>
              <div onClick={() => setSelectedProduct(product)} className="flex items-center justify-center absolute top-10 right-1 w-[30px] h-[30px] rounded-full bg-white">
                <IoEyeOutline className="hover:text-amber-500 " />
              </div>
            </motion.div>

            {/* Product Details */}
            <div className="mt-3">
              <Link to={`/product/${product.id}`}>
                 <motion.p className="text-sm font-semibold text-gray-700">
                    {product.title.length > 30
                      ? product.title.slice(0, 30) + "..."
                      : product.title}
                  </motion.p>
              </Link>
              
              <p className="text-[14px] text-black font-bold">${product.price}</p>

               {/* Rating */}
              <div className="flex items-center mt-1 text-yellow-500 text-sm">
                {[...Array(Math.round(product.rating?.rate || 0))].map((_, i) => (
                  <AiFillStar key={i} />
                ))}
                <span className="ml-1 text-gray-600 text-xs">
                  ({product.rating?.count})
                </span>
              </div>

               {/* Add to Cart */}
             <DrawOutlineButton>Add to Cart</DrawOutlineButton>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button with Animation */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "orange" }}
            whileTap={{ scale: 0.9 }}
            onClick={loadMore}
            className="px-6 py-2 bg-white text-black rounded-md border border-black hover:border-none"
          >
            Load More
          </motion.button>
        </div>
      )}

      {selectedProduct && (
        <ProductPreviewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)} // Close modal
        />
      )}
    </div>
  );
};

export default BestSelling;
