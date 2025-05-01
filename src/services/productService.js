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
        return response.data.productFound;
    } catch (error) {
        throw error.response?.data?.message || "Failed to load product details"
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await apiClient.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete product";
    }
};