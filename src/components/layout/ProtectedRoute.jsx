import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import Loader from "../ui/Loader";

const ProtectedRoute = ({ children }) => {

    const { authenticate, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Loader />; 
    }

    return authenticate ? children : <Navigate to="/landing" replace />
}

export default ProtectedRoute;