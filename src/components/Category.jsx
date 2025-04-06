import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiHeart } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';
import axios from 'axios';
import Loader from './Loaders'; // Assuming you have a Loader component

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (selectedCategory) {
        setLoading(true);
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products', error);
          setError('Could not fetch products. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProductsByCategory();
  }, [selectedCategory]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full mt-10 border-b border-gray-200 p-5">
      {/* Heading */}
      <div className="border-l-8 border-l-amber-500 ml-5">
        <motion.h5 
        whileInView={{opacity:1, x: -1}}
        initial={{opacity:0, x: 100}}
        transition={{duration:1}}
        className="text-amber-500 font-bold ml-5">Categories</motion.h5>
      </div>
      <motion.div 
      whileInView={{opacity:1, x: 0}}
      initial={{opacity:0, x: 100}}
      transition={{duration:0.5}}

      className="ml-5 mt-2.5">
        <h2 className="text-4xl font-bold ml-7">Browse By Category</h2>
      </motion.div>

      {/* Category list */}
      <div className="flex flex-wrap gap-5 w-full mt-10 justify-center">
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            className="w-[120px] h-[120px] bg-gray-50 border border-gray-400 flex items-center justify-center rounded-lg shadow-lg transition-all duration-300 hover:bg-amber-500 hover:text-white cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            <p className="text-center font-semibold">{category}</p>
          </motion.div>
        ))}
      </div>

      {/* Display products for selected category */}
      {selectedCategory && (
        <div className="w-full mt-10">
          <h3 className="text-3xl font-semibold text-center mb-5">{selectedCategory} Products</h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1 }}
                  className="w-full max-w-[320px] h-[350px] border border-[whitesmoke] rounded-lg bg-white p-3"
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
                    <p className="text-[17px] font-semibold">
                      {product.title.length > 20 ? product.title.substring(0, 20) : product.title}
                    </p>
                    <p className="text-[14px] text-black font-bold">
                      ${product.price}
                    </p>

                    {/* Mobile Version of the Button (Always Visible) */}
                    <button
                     className="bg-black text-white w-full h-[30px] rounded-[10px] mt-4" 
                    >

                   
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div>No products found in this category.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
