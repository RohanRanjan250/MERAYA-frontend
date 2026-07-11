import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/authCookie';

const ProtectedRoute = ({ children }) => {
    const isAuth = isLoggedIn();

    if (!isAuth) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
