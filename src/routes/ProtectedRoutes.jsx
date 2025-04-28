import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";



const ProtectedRoutes = ({allowedRoles}) => {

    const { user } = useAuth();
    if(!user) {
        return <Navigate to="/login" />;
    }
    if(allowedRoles && !allowedRoles.includes(user.isAdmin ? "admin" : "user")) {
        // If the user is not an admin and not in the allowed roles, redirect to unauthorized page
        return <Navigate to="/unauthorized" />;
    }
    return <Outlet />;
}

export default ProtectedRoutes