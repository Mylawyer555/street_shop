// import dependencies
import axios from 'axios';
import appConfig from '../config/appConfig';

// create an axios instance with the base URL from the app config
const apiClient = axios.create({
    baseURL: appConfig.API_BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in the headers if it exists
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export default apiClient;
// This code sets up an axios instance with a base URL and includes an authorization token in the headers for each request if it exists in local storage. It uses the appConfig to get the base URL based on the environment (development or production).

