import axios from 'axios';
import { getTenantCode, getTenantDomain } from '../utils/tenant';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://carepoint-hms.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Auth Token and Tenant Headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const tenantCode = getTenantCode();
    if (tenantCode) {
      config.headers['X-Tenant-Code'] = tenantCode;
    }

    const tenantDomain = getTenantDomain();
    if (tenantDomain) {
      config.headers['X-Tenant-Domain'] = tenantDomain;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
      const storage = localStorage.getItem('refresh_token') ? localStorage : sessionStorage;

      if (refreshToken) {
        try {
          const baseURL = import.meta.env.VITE_API_URL || 'https://carepoint-hms.onrender.com/api/v1';
          const response = await axios.post(`${baseURL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token } = response.data;
          storage.setItem('access_token', access_token);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh token expired or invalid
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('auth_user_data');
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          sessionStorage.removeItem('auth_user_data');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
