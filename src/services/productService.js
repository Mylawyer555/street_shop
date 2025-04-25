import apiClient from "./apiClient";

export const fetchProductList = async () => {
    try {
        const response = await apiClient.get('/products');
        return response.data.products;

    } catch (error) {
        throw error.response?.data?.message || "Failed to load products";
    }
};

export const fetchProductsById = async (id) => {
    try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data.products;
    } catch (error) {
        throw error.response?.data?.message || "Failed to load product details"
    }
}