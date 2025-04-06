import React from "react";

const ProductPreviewModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 ">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain rounded"
        />
        <h3 className="mt-4 text-xl font-semibold">{product.title}</h3>
        <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
        <p className="mt-3 text-lg font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductPreviewModal;
