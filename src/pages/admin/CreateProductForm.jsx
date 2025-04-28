import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    sizes: "",
    colors: [],
    price: "",
    totalQty: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleColorChange = (e) => {
    const colorsArray = e.target.value.split(",").map((color) => color.trim());
    setProductData({ ...productData, colors: colorsArray });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, files: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    // send to backend
  };

  // Drag & Drop Setup
  const onDrop = (acceptedFiles) => {
    setProductData((prevState) => ({
      ...prevState,
      files: [...prevState.files, ...acceptedFiles],
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Product Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Brand */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Brand<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Category<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Sizes */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Available Sizes</label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes}
            onChange={handleChange}
            placeholder="E.g: S, M, L, XL"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <small className="text-gray-500 mt-1">Separate sizes with commas.</small>
        </div>

        {/* Colors */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Available Colors</label>
          <input
            type="text"
            name="colors"
            onChange={handleColorChange}
            placeholder="E.g: Red, Blue, Green"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <small className="text-gray-500 mt-1">Separate colors with commas.</small>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Price (₦)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Total Quantity<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="totalQty"
            value={productData.totalQty}
            onChange={handleChange}
            placeholder="Enter available quantity"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Product Images - Drag and Drop */}
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-slate-400 bg-slate-50 p-6 rounded-md cursor-pointer flex flex-col justify-center items-center"
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-600">
            Drag & drop your images here, or click to select files
          </p>
          <small className="text-gray-500">Supports multiple images</small>
        </div>
        
        {/* Preview images */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {productData.files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Product preview ${index}`}
                className="w-full h-[150px] object-cover rounded-md"
              />
              <button
                onClick={() => {
                  const updatedFiles = productData.files.filter((_, i) => i !== index);
                  setProductData({ ...productData, files: updatedFiles });
                }}
                className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* Product Description */}
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="font-semibold mb-1">
            Product Description<span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter detailed product description..."
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
