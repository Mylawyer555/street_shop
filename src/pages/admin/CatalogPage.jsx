import { useState, useEffect } from 'react';
import ProductPreviewModal from '../../components/ProductPreviewModal';
import { Eye } from 'lucide-react';
import { fetchProductList } from "../../services/productService";

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
      const response = await fetchProductList();
      console.log("API response:", response);
      if (Array.isArray(response)) {
        setProducts(response);
      } else {
        console.error('Unexpected product response shape:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedBrand ? product.brand === selectedBrand : true) &&
    (selectedGender ? product.gender === selectedGender : true) &&
    (selectedSize
      ? (Array.isArray(product.sizes)
          ? product.sizes.includes(selectedSize)
          : typeof product.sizes === 'string' && product.sizes.split(',').includes(selectedSize))
      : true) &&
    (selectedColor ? product.colors?.includes(selectedColor) : true)
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (direction) => {
    setCurrentPage((prev) => Math.max(1, prev + direction));
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
          {Array.from(
            new Set(
              products.flatMap((p) =>
                Array.isArray(p.sizes)
                  ? p.sizes
                  : typeof p.sizes === 'string'
                  ? p.sizes.split(',')
                  : []
              )
            )
          ).map((size) => (
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
        {paginatedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={
                Array.isArray(product.files) && product.files.length > 0 && typeof product.files[0] === 'string'
                  ? product.files[0]
                  : '/placeholder.jpg'
              }
              alt={product.name || 'Product Image'}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
              <p className="text-gray-500">
                Sizes:{' '}
                {Array.isArray(product.sizes)
                  ? product.sizes.join(', ')
                  : typeof product.sizes === 'string'
                  ? product.sizes
                  : 'N/A'}
              </p>
              <p className="text-gray-500">
                Colors: {Array.isArray(product.colors) ? product.colors.join(', ') : 'N/A'}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  onClick={() => setPreviewProduct(product)}
                >
                  <Eye size={20} />
                  Preview
                </button>
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
          disabled={paginatedProducts.length < itemsPerPage}
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
