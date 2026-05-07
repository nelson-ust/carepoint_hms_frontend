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
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await apiClient.get('/auth/me');
          const userData = response.data.user || response.data;
          setUser(userData);
          setIsSaasAdmin(userData.is_superuser || !!userData.is_saas_admin);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    const response = await apiClient.post('/auth/login', credentials);
    const { tokens, user: userData, admin_id } = response.data;
    
    localStorage.setItem('access_token', tokens?.access_token || response.data.access_token);
    if (tokens?.refresh_token || response.data.refresh_token) {
      localStorage.setItem('refresh_token', tokens?.refresh_token || response.data.refresh_token);
    }
    
    const finalUser = userData || { 
      id: admin_id, 
      email: response.data.email, 
      first_name: response.data.first_name, 
      last_name: response.data.last_name,
      is_superuser: true 
    };
    
    setUser(finalUser);
    setIsSaasAdmin(finalUser.is_superuser || !!finalUser.is_saas_admin || !!admin_id);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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
