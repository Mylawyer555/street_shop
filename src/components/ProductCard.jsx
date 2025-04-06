import React from "react";
import { BiHeart } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onPreview }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="border border-gray-100 rounded-xl bg-white p-3 shadow-sm relative flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-52 md:h-64 rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain md:object-cover"
        />
        {/* Quick Actions (Heart and Eye) */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-100 transition-opacity duration-300">
          <div className="bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500">
            <BiHeart className="text-lg hover:text-white" />
          </div>
          <div
            onClick={onPreview}
            className="bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500"
          >
            <IoEyeOutline className="text-lg hover:text-white" />
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="mt-3 flex flex-col justify-between flex-grow">
        <Link to={`/product/${product.id}`}>
          <motion.p className="text-sm font-semibold text-gray-700">
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

        {/* Add to Cart */}
        <button className="bg-black text-white w-full h-10 rounded-lg mt-3">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
