import apiClient from "./apiClient";
// creating new product
export const createProduct = async (formdata) =>{
    try {
        const response = await apiClient.post('/products', formdata, {
            headers:{
                "Content-Type": "multipart/formdata",
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Product creation failed";
    }
};

// fetch category 
export const fetchCategories = async () =>{
    try {
        const response = await apiClient.get('/categories');
        return response.data.categories;
    } catch (error) {
        throw "Failed to fetch categories" + error;
    }
};

export const createCategories = async (name, file) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
        const response = await apiClient.post("/categories", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to create category";
    }
};

export const getSingleCategory = async (catId) =>{
    try {
        const response =  await apiClient.get(`/categories/${catId}`);
        return response.data.category;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch category details";
    }
};

export const updateCategory = async (catId, name) => {
    try {
        const response = await apiClient.put(`/categories/${catId}`, { name });
        return response.data.category;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update category";
    }

};

export const deleteCategory = async (catId) => {
    try {
        const response = await apiClient.delete(`/categories/${catId}`);
        return response.data.message;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete category";
        
    }
};


// fetch brands for dropdown
export const fetchbrands = async () =>{
    try {
        const response = await apiClient.get("/brands");
        return response.data.brands;
    } catch (error) {
        throw "failed to fetch brand" + error;
    }
};

export const createBrand = async () => {
    try {
        const response = await apiClient.post("/brands", { name: "New Brand" });
        return response.data.brand;
    } catch (error) {
        throw error.response?.data?.message || "Failed to create brand";
    }
}

export const getBrandById = async (brandId) => {
    try {
        const response = await apiClient.get(`/brands/${brandId}`);
        return response.data.brand;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch brand details";
    }
}

export const updateBrand = async (brandId, name) => {
    try {
        const response = await apiClient.put(`/brands/${brandId}`, { name });
        return response.data.brand;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update brand";
    }
};

export const deleteBrand = async (brandId) => {
    try {
        const response = await apiClient.delete(`/brands/${brandId}`);
        return response.data.message;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete brand";
    }
};

// fetch colors 

export const fetchColors = async () =>{
   try{ 
        const response = await apiClient.get('/colors');
        return response.data.colors;
    }catch (error){
        throw "failed to fetch color" + error;
    }   
};

export const createColor = async (name) => {
    try {
        const response = await apiClient.post("/colors", { name });
        return response.data.color;
    } catch (error) {
        throw error.response?.data?.message || "Failed to create color";
    }
};

export const getColorById = async (colorId) => {
    try {
        const response = await apiClient.get(`/colors/${colorId}`);
        return response.data.color;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch color details";
    }
};

export const updateColor = async (colorId, name) => {
    try {
        const response = await apiClient.put(`/colors/${colorId}`, { name });
        return response.data.color;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update color";
    }
};

export const deleteColor = async (colorId) => {
    try {
        const response = await apiClient.delete(`/colors/${colorId}`);
        return response.data.message;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete color";
    }
}

export const fetchUsersList2 = async () => {
    try {
        const response = await apiClient.get("/users/list");
        return response.data.data || []; // Return an empty array if no data is found
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch users list";
    }
};

// fetch list of product for stats
export const fetchProductList = async () => {
    try {
        const response = await apiClient.get('/products/');
        return response.data.products || []; // Return an empty array if no products are found
    } catch (error) {
        throw error.response?.data?.message || "Failed to load products";
    }
};

//fetch single user details
export const getUserById = async (userId) => {
 try{  
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
    }catch (error) {
        throw error.response?.data?.message || "Failed to fetch single user";
    } 
};
  