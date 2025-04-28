import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/brownShoes.jpg" // Your premium shoe background
          alt="Elegant Corporate Shoes"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
        whileInView={{ opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Step into Elegance
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-md md:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl"
        >
          Discover finely crafted footwear designed for the modern gentleman.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <Link to="/shop">
            <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white text-black font-semibold rounded-full transition-all">
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
