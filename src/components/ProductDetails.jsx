import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductsById, fetchProductList } from "../services/productService";
import { fetchCategories } from "../services/AdminService";
import { useCart } from "../context/CartContext";
import Loader from "./Loaders";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductsById(id);
        console.log("Fetched product data:", data);

        setProduct(data);
        setMainImage(data?.images?.[0] || "");
        setSelectedSize(data?.sizes?.[0] || "");
        setSelectedColor(data?.colors?.[0] || "");

        // Fetch related products based on category
        const allProducts = await fetchProductList();
        const related = allProducts.filter(
          (item) =>
            item.category === data.category &&
            item._id !== data._id
        );
        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product)
    return <div className="text-center mt-10">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Image Section */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="w-full h-[350px] border rounded-md overflow-hidden bg-gray-100">
            <img
              src={mainImage || "/placeholder.jpg"}
              alt="Main product"
              className="w-full h-full object-fill"
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`h-20 w-full object-cover border rounded-md cursor-pointer ${
                  img === mainImage ? "ring-2 ring-black" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="col-span-1 flex flex-col justify-start space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
          
            <p className="text-orange-600 text-[16px] animate-pulse">
              <span className="font-semibold text-green-600">Stock:</span>{" "}
              {product.qtyLeft} left
            </p>
           
            <p>
              <span className="font-semibold">Added:</span>{" "}
              {new Date(product.createdAt).toDateString()}
            </p>
          </div>

          <p className="text-2xl font-semibold text-orange-600">
            {product.price && !isNaN(product.price)
              ? product.price.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : "₦0"}
            {/* {product.price} */}
          </p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1">Size:</h4>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md ${
                      size === selectedSize ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1">Color:</h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === selectedColor ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Purchase Box */}
        <div className="col-span-1 border rounded-md p-4 shadow-sm space-y-4 h-fit">
          <p className="text-xl font-bold text-black">
            {product && typeof product.price === "number"
              ? product.price.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })
              : "₦0"}
          </p>

          <p className="text-green-600">In Stock</p>

          <button
            onClick={() =>
              addToCart({ ...product, selectedSize, selectedColor })
            }
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-semibold animate-bounce transition duration-initial flex items-center justify-center gap-2"
          >
            Add to Cart
          </button>

          <ul className="text-sm space-y-1 text-gray-600">
            <li>✅ Secure transaction – Guaranteed Checkout</li>
            <li>🚚 Free Shipping for orders above ₦10,000</li>
            <li>↩️ 30-day Return Policy</li>
            <li>🔒 Your data is protected with us</li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="border rounded-lg p-3 hover:shadow-md transition"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h4 className="text-sm font-medium truncate">{item.name}</h4>
                <p className="text-orange-600 font-semibold text-sm">
                  {typeof item.price === "number"
                    ? item.price.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })
                    : "₦0"}
                  {/* {item.price} */}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
