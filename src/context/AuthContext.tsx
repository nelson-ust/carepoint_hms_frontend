import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isSaasAdmin: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSaasAdmin, setIsSaasAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      const storedData = localStorage.getItem('auth_user_data') || sessionStorage.getItem('auth_user_data');

      if (token) {
        try {
          // Decode JWT for role detection
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jwtPayload = JSON.parse(window.atob(base64));
          const isSaaS = jwtPayload.is_saas_admin || jwtPayload.role === 'SAAS_ADMIN';

          // If we have stored data, use it for immediate UI update
          if (storedData) {
            const data = JSON.parse(storedData);
            const userData = data.user || data;
            setUser(userData);
            setIsSaasAdmin(isSaaS || !!data.admin_id);
          }

          const response = await apiClient.get('/auth/me');
          const userData = response.data.user || response.data;
          setUser(userData);
          setIsSaasAdmin(isSaaS || !!userData.is_saas_admin || userData.role === 'SAAS_ADMIN' || !!response.data.admin_id);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('auth_user_data');
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          sessionStorage.removeItem('auth_user_data');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    console.log('[AuthContext] Initiating login request...');
    const response = await apiClient.post('/auth/login', credentials);
    const data = response.data;
    console.log('[AuthContext] Login response received:', data);
    
    const { access_token, refresh_token, tokens, remember_me } = data;
    
    // Determine storage based on remember_me
    const storage = credentials.remember_me || remember_me ? localStorage : sessionStorage;
    
    const accessToken = tokens?.access_token || access_token;
    const refreshToken = tokens?.refresh_token || refresh_token;

    storage.setItem('access_token', accessToken);
    if (refreshToken) {
      storage.setItem('refresh_token', refreshToken);
    }
    
    // Decode JWT to get role and extra info
    let jwtPayload: any = {};
    try {
      const base64Url = accessToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      jwtPayload = JSON.parse(window.atob(base64));
      console.log('[AuthContext] Decoded JWT Payload:', jwtPayload);
    } catch (e) {
      console.error('[AuthContext] Failed to decode JWT', e);
    }

    // Store entire login response for quick access
    storage.setItem('auth_user_data', JSON.stringify(data));
    
    const isSaaS = jwtPayload.is_saas_admin || jwtPayload.role === 'SAAS_ADMIN' || !!data.admin_id;

    const finalUser = data.user || { 
      id: data.admin_id || data.id || jwtPayload.sub, 
      email: data.email || jwtPayload.email, 
      first_name: data.first_name, 
      last_name: data.last_name,
      is_superuser: isSaaS
    };
    
    console.log('[AuthContext] Setting user state:', finalUser, 'Is SaaS Admin:', isSaaS);
    setUser(finalUser);
    setIsSaasAdmin(isSaaS);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('auth_user_data');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('auth_user_data');
    setUser(null);
    setIsSaasAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isSaasAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
