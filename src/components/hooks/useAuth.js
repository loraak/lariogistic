// hooks/useAuth.js
import { useState, useEffect } from 'react';
import authService from '../Auth/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar si el usuario está autenticado al cargar
        const checkAuth = () => {
            if (authService.isAuthenticated()) {
                const userData = authService.getUser();
                setUser(userData);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        const result = await authService.login(email, password);
        
        if (result.success) {
            setUser(result.data.user);
            setIsAuthenticated(true);
        }
        
        return result;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const refreshTokens = async () => {
        const result = await authService.refreshToken();
        return result;
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshTokens,
        authService
    };
};