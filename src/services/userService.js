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

const loginUser = async (credentials) => {
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