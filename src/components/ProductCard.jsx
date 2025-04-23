import React from "react";
import { BiCart, BiHeart } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onPreview }) => {

  const { addToCart } = useCart();



  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="border border-gray-100 rounded-xl bg-white p-3 shadow-sm relative flex flex-col"
    >
      {/* Image Section with Desktop Hover Zoom */}
      <div className="relative h-52 md:h-64 rounded-md overflow-hidden group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain md:object-cover transition-transform duration-500 ease-in-out md:group-hover:scale-110"
        />

        {/* Quick Actions (Always visible on mobile, hover on desktop) */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500"
          >
            <BiHeart className="text-lg hover:text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={onPreview}
            className="bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500"
          >
            <IoEyeOutline className="text-lg hover:text-white" />
          </motion.div>
        </div>
      </div>

      

      {/* Product Info Section */}
      <div className="mt-3 flex flex-col justify-between flex-grow">
        <Link to={`/product/${product.id}`}>
          <motion.p
            whileTap={{ scale: 0.98 }}
            className="text-sm font-semibold text-gray-700 hover:text-amber-600 transition-colors"
          >
            {product.title.length > 30
              ? product.title.slice(0, 30) + "..."
              : product.title}
          </motion.p>
        </Link>
        <p className="text-base font-bold text-black">${product.price}</p>

        {/* Rating */}
        <div className="flex items-center mt-1 text-yellow-500 text-sm">
          {[...Array(Math.round(product.rating?.rate || 0))].map((_, i) => (
            <AiFillStar key={i} />
          ))}
          <span className="ml-1 text-gray-600 text-xs">
            ({product.rating?.count})
          </span>
        </div>

        {/* Add to Cart Button - Tap & Hover Effects */}
        <motion.button
          onClick={() => addToCart(product)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white w-full h-10 translate-x-2 rounded-lg mt-3 transition-colors duration-300 md:hover:bg-amber-500"
        >
         Add to Cart
        </motion.button>
        
        
      </div>
    </motion.div>
  );
};

export default ProductCard;
