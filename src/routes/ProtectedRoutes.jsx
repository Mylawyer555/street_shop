import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";



const ProtectedRoutes = ({allowedRoles}) => {

    const { user } = useAuth();
    if(!user) {
        return <Navigate to="/login" />;
    }
   
    return <Outlet />;
}

export default ProtectedRoutes