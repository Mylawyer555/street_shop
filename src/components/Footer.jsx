import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul>
              <li><Link to="/" className="hover:text-amber-500">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-500">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500">Contact</Link></li>
              <li><Link to="/shop" className="hover:text-amber-500">Shop</Link></li>
              <li><Link to="/terms" className="hover:text-amber-500">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-amber-500">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-xl mb-4">Customer Service</h3>
            <ul>
              <li><Link to="/faq" className="hover:text-amber-500">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-amber-500">Shipping Information</Link></li>
              <li><Link to="/returns" className="hover:text-amber-500">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500">Contact Support</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-bold text-xl mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link to="#" className="text-gray-500 hover:text-amber-500">
                <FaFacebookF size={20} />
              </Link>
              <Link to="#" className="text-gray-500 hover:text-amber-500">
                <FaTwitter size={20} />
              </Link>
              <Link to="#" className="text-gray-500 hover:text-amber-500">
                <FaInstagram size={20} />
              </Link>
              <Link to="#" className="text-gray-500 hover:text-amber-500">
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-bold text-xl mb-4">Newsletter</h3>
            <p className="mb-4">Sign up for our latest updates and promotions.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded w-full mb-4 text-black"
            />
            <button className="bg-amber-500 text-white w-full p-2 rounded">Subscribe</button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2025 YourStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
