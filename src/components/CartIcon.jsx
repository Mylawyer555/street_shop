import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const CartIcon = () => {
  const { cartItems } = useCart(); // Access cart items from the context
  const { user } = useAuth(); // Access user info to check authentication status
  const navigate = useNavigate();

  // Get the total count of items in the cart
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCartClick = () => {
    if (user) {
      // If the user is authenticated, navigate to the cart page
      navigate("/cart");
    } else {
      // If the user is not authenticated, redirect to the login page
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCartClick}
        className="flex items-center text-xl"
      >
        <MdShoppingCart />
        {/* Show item count badge if there are items in the cart */}
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">
            {cartItemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartIcon;
