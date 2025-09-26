// src/components/Auth/PublicRoute.js

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ children }) => {
    // Obtenemos el estado de autenticación del contexto
    const { isAuthenticated } = useAuth();

    // El console.log para estar 100% seguros
    console.log(`[PublicRoute] El usuario está autenticado: ${isAuthenticated}`);

    // Si el usuario SÍ está autenticado...
    if (isAuthenticated) {
        // ...lo redirigimos a la página de inicio.
        return <Navigate to="/" replace />;
    }

    // Si NO está autenticado, simplemente mostramos el componente hijo (la página de Login).
    return children;
};

export default PublicRoute;