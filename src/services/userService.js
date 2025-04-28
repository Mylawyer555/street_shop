import apiClient from "./apiClient";

export const registerUser = async (userdata) => {
    try {
        const response = await apiClient.post("/users/register", userdata);

        const {message, data} = response.data;

        return {
            message,
            user: {fullName: data.fullName, email: data.email, id: data._id},
        };
    } catch (error) {
        console.log("Registration Error:", error);

        // Optional: more detailed logging
        console.log("Error Response:", error.response);
        console.log("Error Data:", error.response?.data);
        throw error.response?.data?.message || "Registration failed";
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post('/users/login', credentials);
        const {message, token, userFound} = response.data;
        return {
            message,
            token,
            user: {
                fullName: userFound.fullName,
                email: userFound.email,
                id: userFound._id,
                createdAt: userFound.createdAt,
                isAdmin: userFound.isAdmin,
                ShippingAddress: userFound.hasShippingAddress,
            },
        };
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
}

export const updateShippingAddress = async (addressData) =>{
    try {
        const response = await apiClient.put('/users/update-address', addressData);
        const {message, user} = response.data;
        return {message, user};
    } catch (error) {
        throw error.response?.data?.message || "Failed to update shipping address"
    }
};


export const listAllUsers = async (cursor = null) => {
    // Fetch all users with optional cursor for pagination
    try {
        const response = await apiClient.get("/users/list", {
            params:cursor ? {cursor} : {},
        });
        // Destructure the response to get users and nextCursor
        const {data, nextCursor} = response.data;
        // Check if the response contains users and nextCursor
        return {
            users: data,
             nextCursor
        };
    } catch (error) {
        console.log("Error fetching users:", error);
        throw error.response?.data?.message || "Failed to fetch users";
    }
};

export const getUserProfile = async () => {
    try{
        const response = await apiClient.get('/users/profile');
        const {message, user} = response.data;
        return {message, user: {
            fullName: user.fullName,
            email: user.email,
            id: user._id,
            createdAt: user.createdAt,
            isAdmin: user.isAdmin,
            hasShippingAddress: user.hasShippingAddress,
        }};
    }catch(error) {
        console.log("Error fetching user profile:", error);
        throw error.response?.data?.message || "Failed to fetch user profile";

    }
    
};

export const deleteUser = async (userid) => {
   try {
    const response = await apiClient.delete(`/users/${userid}`);
    return response.data;
   } catch (error) {
    throw error.response?.data?.message || "Failed to delete user";
   }
};

export const fetchSingleUser = async (userid) => {
    try {
        const response = await apiClient.get(`/users/${userid}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching single user:", error);
        throw error.response?.data?.message || "Failed to fetch single user";
    }
};


export const deleteMultipleUsers = async (userIds) => {
    try {
        const response = await apiClient.delete('/users/delete-multiple',{
            data: {userIds}
        });
        return response.data;

    } catch (error) {
        throw error.response?.data?.message || "Failed to delete users";
    }
};