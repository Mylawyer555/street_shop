import {
  fetchbrands,
  fetchCategories,
  fetchColors,
  createProduct,
  createBrand,
  createCategories,
  createColor,
} from "@/services/AdminService";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

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
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [b, c, cl] = await Promise.all([
          fetchbrands(),
          fetchCategories(),
          fetchColors(),
        ]);
        setBrands(b);
        setCategories(c);
        setColors(cl);
      } catch (error) {
        toast.error("Error fetching options");
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      const filesArray = Array.from(files);
      setProductData((prev) => ({ ...prev, files: filesArray }));
    } else if (name === "colors") {
      const colorsArray = value.split(",").map((color) => color.trim());
      setProductData((prev) => ({ ...prev, colors: colorsArray }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let brandId = brands.find(
        (b) => b.name.toLowerCase() === productData.brand.toLowerCase()
      )?._id;
      if (!brandId && newBrand) {
        const newBrandResponse = await createBrand(newBrand);
        brandId = newBrandResponse._id;
        setBrands((prev) => [...prev, newBrandResponse]);
      }

      let categoryId = categories.find(
        (c) => c.name.toLowerCase() === productData.category.toLowerCase()
      )?._id;
      if (!categoryId && newCategory) {
        const newCategoryResponse = await createCategories(
          newCategory,
          new File([""], "placeholder.png", { type: "image/png" })
        );
        categoryId = newCategoryResponse._id;
        setCategories((prev) => [...prev, newCategoryResponse]);
      }

      const resolvedColorIds = [];
      for (const color of productData.colors) {
        let existing = colors.find(
          (c) => c.name.toLowerCase() === color.toLowerCase()
        );
        if (!existing && newColor) {
          const newColorResponse = await createColor(newColor);
          resolvedColorIds.push(newColorResponse._id);
          setColors((prev) => [...prev, newColorResponse]);
        } else {
          resolvedColorIds.push(existing._id);
        }
      }

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("brand", brandId);
      formData.append("category", categoryId);
      formData.append("sizes", productData.sizes);
      formData.append("price", productData.price);
      formData.append("totalQty", productData.totalQty);
      resolvedColorIds.forEach((id) => formData.append("colors", id));
      productData.files.forEach((file) => formData.append("files", file));

      const res = await createProduct(formData, setUploadProgress);
      toast.success(res.data.message || "Product created!");
      setUploadProgress(0);
      setProductData({
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed.");
      setUploadProgress(0);
    }
  };

  const onDrop = (acceptedFiles) => {
    setProductData((prev) => ({
      ...prev,
      files: [...prev.files, ...acceptedFiles],
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-600 h-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* Product Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block text-lg font-medium text-gray-700">
              Brand
            </label>
            <select
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              placeholder="Or add new brand"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category and Description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Or add new category"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter a product description"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Price, Quantity, and Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="totalQty" className="block text-lg font-medium text-gray-700">
              Total Quantity
            </label>
            <input
              type="number"
              name="totalQty"
              value={productData.totalQty}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="sizes" className="block text-lg font-medium text-gray-700">
              Sizes
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes}
              onChange={handleChange}
              placeholder="Enter available sizes"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label htmlFor="colors" className="block text-lg font-medium text-gray-700">
            Colors
          </label>
          <select
            multiple
            name="colors"
            value={productData.colors}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {colors.map((color) => (
              <option key={color._id} value={color.name}>
                {color.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Or add new color"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* File Upload */}
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 bg-gray-50 p-6 rounded-md cursor-pointer text-center"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag & drop or click to upload images</p>
          <small className="text-gray-500">
            Supports multiple images (jpg, png, webp)
          </small>
        </div>

        {/* Files Preview */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {productData.files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-[150px] object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = productData.files.filter((_, i) => i !== index);
                  setProductData({ ...productData, files: updated });
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center lg:justify-end mt-6 ">
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-md w-full sm:w-auto hover:bg-blue-700 transition duration-300"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
