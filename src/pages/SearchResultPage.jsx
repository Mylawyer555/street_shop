import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(useLocation().search).get("query"); // Get the search query

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${BASE_URL}/products`, {
          params: {
            search: query, // Pass the search query as a parameter to the API
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-10 w-full p-5">
      <h2 className="text-4xl font-bold">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {products.length === 0 ? (
          <div>No products found for "{query}"</div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border p-5">
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
