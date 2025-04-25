import { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  // State to hold user data
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // login function to authenticate user
  const login = (userData) => {
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Update state with user data
  };

  // logout function to clear user data
  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear user data from state
    window.location.href = "/"; // redirect to home page or login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); //returns the results of the useContext hook, which is the value of the AuthContext.Provider
// Export the AuthProvider and useAuth hook for use in other components
