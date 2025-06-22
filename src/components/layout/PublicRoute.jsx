import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import Loader from "../ui/Loader";

const PublicRoute = ({ children }) => {
    
    const { authenticate, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Loader />; 
    }

    return authenticate ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;