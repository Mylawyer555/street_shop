import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";



const JewelryCategory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${BASE_URL}/products/category/jewelery`)
                setProducts(response.data);
            } catch (error) {
                console.log(error);
                setError(`Error fetching jewelry: ${err.message}`)
            }finally{
                setLoading(false);
            }
        }
        fetchProducts();
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
  return (
    <div className="container mx-auto px-5 py-10">
    <h2 className="text-3xl font-bold mb-8 text-center">Jewelry Collection</h2>

    {/* Products Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold truncate">{product.title}</h3>
            <p className="text-gray-500">${product.price}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
  )
}

export default JewelryCategory