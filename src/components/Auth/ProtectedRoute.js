// src/components/Auth/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Verificando sesión...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles) {
        console.log('Verificando rol:', { 
            userRole: user.idRol, 
            typeOfUserRole: typeof user.idRol,
            requiredRoles: roles,
            isAllowed: roles.includes(user.idRol) 
        });

        if (!roles.includes(user.idRol)) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;