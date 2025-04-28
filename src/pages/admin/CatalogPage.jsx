// src/pages/catalog/CatalogPage.jsx
import { useState, useEffect } from 'react';
import ProductPreviewModal from '../../components/ProductPreviewModal';
import { Eye } from 'lucide-react';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedBrand ? product.brand === selectedBrand : true) &&
    (selectedGender ? product.gender === selectedGender : true) &&
    (selectedSize ? product.sizes?.includes(selectedSize) : true) &&
    (selectedColor ? product.colors?.includes(selectedColor) : true)
  );

  const handlePagination = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Catalog Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Product Catalog</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
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
          {Array.from(new Set(products.flatMap((p) => p.sizes?.split(',') || []))).map((size) => (
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={product.files[0] || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
              <p className="text-gray-500">Sizes: {product.sizes.join(', ')}</p>
              <p className="text-gray-500">Colors: {product.colors.join(', ')}</p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  className="text-indigo-600 hover:text-indigo-800"
                  onClick={() => setPreviewProduct(product)}
                >
                  <Eye size={20} />
                  Preview
                </button>
                <button className="text-red-600 hover:text-red-800">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => handlePagination(-1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black rounded-md px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {currentPage}</span>
        <button
          onClick={() => handlePagination(1)}
          disabled={filteredProducts.length < itemsPerPage}
          className="bg-gray-300 text-black rounded-md px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Product Preview Modal */}
      {previewProduct && (
        <ProductPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
      )}
    </div>
  );
}
