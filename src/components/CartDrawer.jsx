import React, { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Cart Icon */}
      <div
        onClick={toggleDrawer}
        className="fixed bottom-10 right-10 bg-black text-white p-3 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"
      >
        <MdOutlineShoppingCart className="w-6 h-6" />
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
          {cartItems.length}
        </span>
      </div>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 w-[400px] bg-white shadow-xl z-50 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={toggleDrawer} className="text-2xl text-gray-600">
            <IoMdClose />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-5 overflow-y-auto h-[calc(100vh-150px)]">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-5"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Total & Actions */}
        <div className="p-5 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Total</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/cart">
            <button
              onClick={toggleDrawer}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Go to Cart
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
