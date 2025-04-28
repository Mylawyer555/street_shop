// src/pages/admin/products/InventoryPage.jsx
import { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import ProductPreviewModal from "@/components/ProductPreviewModal";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        setProducts(products.filter((p) => p._id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const toggleSelect = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedBrand ? product.brand === selectedBrand : true) &&
    (selectedGender ? product.gender === selectedGender : true) &&
    (selectedSize ? product.sizes?.includes(selectedSize) : true) &&
    (selectedColor ? product.colors?.includes(selectedColor) : true)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Inventory</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Brands</option>
            {[...new Set(products.map((p) => p.brand))].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Sizes</option>
            {Array.from(new Set(products.flatMap((p) => p.sizes?.split(",") || []))).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Colors</option>
            {Array.from(new Set(products.flatMap((p) => p.colors || []))).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedProducts(e.target.checked ? filteredProducts.map((p) => p._id) : [])
                  }
                  checked={
                    selectedProducts.length === filteredProducts.length &&
                    filteredProducts.length !== 0
                  }
                />
              </th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleSelect(product._id)}
                  />
                </td>
                <td className="py-3 px-6">
                  <img
                    src={product.files[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">${product.price}</td>
                <td className="py-3 px-6">{product.totalQty}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => setPreviewProduct(product)}
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}
    </div>
  );
}
