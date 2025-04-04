import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiHeart } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';
import Products from '../Product';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const BestSelling = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const maxProducts = 12;

  useEffect(() => {
    setDisplayedProducts(shuffleArray(Products));
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, maxProducts));
  };

  return (
    <div className="mt-10 w-full p-5">
      <div className="border-l-8 border-l-amber-500 ml-5">
        <h2 className="text-xl font-bold ml-5">Best Selling Products</h2>
      </div>

      {/* Product Layout: Grid on Small Screens, Row on Large Screens */}
      <div className="w-[80%] flex flex-wrap md:flex-nowrap gap-5 justify-center md:overflow-x-hidden mt-10 mx-auto">
        {displayedProducts.slice(0, visibleCount).map((product) => (
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1 }}
            className="w-full max-w-[320px] lg:max-w-[250px] mx-auto rounded-lg bg-white p-3 flex-shrink-0"
            key={product.id}
          >
            {/* Image Container with Hover Effect */}
            <motion.div
              className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product.image_url}
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

              {/* Mobile Version of the Button (Always Visible) */}
              <button className="absolute bottom-0 left-0 bg-black text-white w-[100%] h-[30px] shadow-md md:hidden">
                Add to Cart
              </button>

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
              <p className="text-[17px] font-semibold">
                {product.product_name.split(" ").slice(0, 3).join(" ")}...
              </p>
              <p className="text-[14px] text-black font-bold">${product.selling_price}</p>
              <span className="line-through text-[14px] text-gray-400">
                ${product.discount_price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button with Animation */}
      {visibleCount < maxProducts && (
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
    </div>
  );
};

export default BestSelling;
