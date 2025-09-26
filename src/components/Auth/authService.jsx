const API_BASE_URL = '/api';

class AuthService {
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.setTokens(data.accessToken, data.refreshToken);
                this.setUser(data.user);
                return { success: true, data };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, error: 'Error de conexión con el servidor' };
        }
    }

    setTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated() {
        const token = this.getAccessToken();
        const user = this.getUser();
        return !!(token && user);
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    async authenticatedRequest(url, options = {}) {
        const token = this.getAccessToken();
        
        const authenticatedOptions = {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        try {
            const response = await fetch(url, authenticatedOptions);
            
            if (response.status === 401) {
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    authenticatedOptions.headers['Authorization'] = `Bearer ${this.getAccessToken()}`;
                    return await fetch(url, authenticatedOptions);
                } else {
                    this.logout();
                    window.location.href = '/login';
                    return response;
                }
            }
            
            return response;
        } catch (error) {
            console.error('Error en petición autenticada:', error);
            throw error;
        }
    }

    async refreshToken() {
        const refreshToken = this.getRefreshToken();
        
        if (!refreshToken) {
            return { success: false, error: 'No hay refresh token' };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken })
            });

            const data = await response.json();

            if (response.ok) {
                this.setTokens(data.accessToken, data.refreshToken);
                return { success: true, data };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Error al renovar token:', error);
            return { success: false, error: 'Error de conexión' };
        }
    }
}

export const authService = new AuthService();
export default authService;