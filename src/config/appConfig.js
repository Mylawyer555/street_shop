
const configs = {
    development:{
        // Add your development configuration here
        API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    },
    production:{
        // Add your production configuration here
        API_BASE_URL: import.meta.env.VITE_API_BASE_URL_PROD,
    },
}

// Get the current environment
const ENV = import.meta.env.VITE_APP_ENV || 'development';

//pick the configuration based on the environment
const appConfig = configs[ENV];

// Export the configuration object
export default appConfig;