import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

    if (!isAuth) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
