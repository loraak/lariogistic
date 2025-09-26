// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // La base de tu URL de la API
});

// 1. Interceptor para añadir el token de acceso a cada petición
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Interceptor para manejar la expiración del token de acceso
api.interceptors.response.use(
    (response) => {
        // Si la petición fue exitosa, solo la retornamos
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no es una petición de reintento
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marcamos como reintento
            
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                // Si no hay refresh token, redirigimos al login
                // (esto lo manejará el contexto, aquí solo limpiamos)
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Hacemos la petición al endpoint de refresh
                const { data } = await api.post('/auth/refresh', { refreshToken });

                // Guardamos el nuevo accessToken
                localStorage.setItem('accessToken', data.accessToken);
                
                // Actualizamos el header de la petición original
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                // Reintentamos la petición original con el nuevo token
                return api(originalRequest);

            } catch (refreshError) {
                // Si el refresh token también es inválido o expiró
                console.error("Refresh token inválido. Cerrando sesión.");
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;