import React from "react";
import { useCart } from '../context/CartContext';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { 
    cartItems,
    removeFromCart,
    clearCart 
  } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
        <Link to="/" className="text-amber-500 underline mt-4 inline-block">
          Browse Products
        </Link>
      </div>
    );

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 ">Your Shopping Cart</h1>
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center border-b py-4 pr-2.5 gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img 
                  src={item.images?.[0] || "/placeholder.jpg"} 
                  alt={item.name} 
                  className="w-20 h-20 object-contain" 
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString("en-NG", {
                      currency: "NGN",
                      style: "currency",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-bold">₦{(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t  pt-5">
          <p className="text-xl font-bold">Total: ₦{totalPrice.toFixed(2)}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={clearCart}
              className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Clear Cart
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-amber-500 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
