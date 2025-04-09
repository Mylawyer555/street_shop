import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaTruck, FaLock, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import { AiFillStar } from "react-icons/ai";

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Fetch product details based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Adjust your API base URL
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        setProduct(response.data); // Store the product details
      } catch (error) {
        setError(`An error occurred: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-fetch when the ID changes (e.g., when navigating between products)

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!product) return <div>No product found</div>;

  const isClothing = product.category === "clothes"; // Assuming category indicates clothing

  return (
    <div className=" w-full   mx-auto mt-10 flex flex-col  justify-center lg:flex-row gap-10 p-5">
      {/* product image */}
      <motion.div
        className="w-[60%]  flex  justify-center lg:w-[30%]  "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
           
            className="w-full max-w-[500px] mx-auto  object-contain lg:object-cover lg:h-[60%]"
          />
        ) : (
          <div className="w-ful h-[300px] bg-gray-200 flex items-center justify-center">
            <p>Image not available</p>
          </div>
        )}
      </motion.div>

      {/* product details */}
      <motion.div
        className="w-full lg:w-[40%] px-5 "
        whileInView={{opacity:1, x: 0}}
        initial={{opacity:0, x: 100}}
        transition={{duration:1}}
      >
        <h2 className="text-4xl font-bold">
          {product.title.length > 20
            ? product.title.substring(0, 20)
            : product.title}
        </h2>
        <p className="text-xl mt-5">${product.price}</p>
        <p className="mt-3">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mt-1 text-yellow-500 text-sm">
          {[...Array(Math.round(product.rating?.rate || 0))].map((_, i) => (
            <AiFillStar key={i} />
          ))}
          <span className="ml-1 text-gray-600 text-xs">
            ({product.rating?.count})
          </span>
        </div>

        {/* Conditionally render Size and Color based on the product type */}
        {isClothing ? (
          <>
            {/* Size Selection */}
            <div className="mt-5">
              <label htmlFor="size" className="block text-lg">
                Choose Size:
              </label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-2 border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
              </select>
            </div>

            {/* Color Selection */}
            <div className="mt-5">
              <label htmlFor="color" className="block text-lg">
                Choose Color:
              </label>
              <select
                id="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mt-2 border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select Color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </div>
          </>
        ) : (
          // For non-clothing items, only show color selection
          <div className="mt-5">
            <label htmlFor="color" className="block text-lg">
              Choose Color:
            </label>
            <select
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="mt-2 border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select Color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </div>
        )}

        {/* Stylish Delivery and Checkout Information */}
        <motion.div
          className="mt-10 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center space-x-3">
            <FaTruck className="text-2xl text-green-500" />
            <div>
              <p className="font-semibold text-lg">Guaranteed Delivery</p>
              <p className="text-sm text-gray-600">
                Get your product delivered within 2-5 business days
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaLock className="text-2xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Safe Checkout Process</p>
              <p className="text-sm text-gray-600">
                Shop with confidence. Secure payment methods
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaCheckCircle className="text-2xl text-yellow-500" />
            <div>
              <p className="font-semibold text-lg">
                Stylish & Guaranteed Quality
              </p>
              <p className="text-sm text-gray-600">
                We ensure top-quality products delivered to you
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add to Cart Button */}
        <motion.div
          className="mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.button className="bg-black text-white px-6 py-2 rounded-md w-full">
            Add to Cart
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductPage;
