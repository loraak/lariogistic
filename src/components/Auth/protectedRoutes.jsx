// components/ProtectedRoute.js
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    // Mostrar spinner mientras se verifica la autenticación
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px'
            }}>
                Cargando...
            </div>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        window.location.href = '/login';
        return null;
    }

    // Si está autenticado, mostrar el contenido protegido
    return children;
};

export default ProtectedRoute;