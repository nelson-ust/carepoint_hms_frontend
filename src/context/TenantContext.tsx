import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { getTenantCode } from '../utils/tenant';

interface TenantConfig {
  name: string;
  logo_url?: string;
  primary_color?: string;
  accent_color?: string;
  hospital_name?: string;
}

interface TenantContextType {
  tenantConfig: TenantConfig | null;
  isLoading: boolean;
  isTenantDomain: boolean;
  tenantCode: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenantConfig, setTenantConfig] = useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tenantCode = getTenantCode();
  const isTenantDomain = !!tenantCode && tenantCode !== 'www' && tenantCode !== 'localhost';

  useEffect(() => {
    const fetchTenantConfig = async () => {
      if (isTenantDomain) {
        console.log(`[TenantContext] Detected tenant subdomain: ${tenantCode}. Fetching configuration...`);
        try {
          // We call a public endpoint or use the headers to get branding
          // Since /settings is protected, this will fail if not logged in.
          // In a real scenario, use a public branding endpoint like /tenants/public/{code}
          const response = await apiClient.get('/settings');
          console.log('[TenantContext] Configuration loaded successfully:', response.data.name);
          setTenantConfig(response.data);
        } catch (error: any) {
          if (error.response?.status === 401) {
            console.log('[TenantContext] Branding fetch skipped (requires authentication)');
          } else {
            console.error('[TenantContext] Failed to fetch tenant configuration:', error);
          }
          // Fallback if branding fails
          setTenantConfig(null);
        }
      } else {
        console.log('[TenantContext] On primary domain. No tenant-specific branding.');
      }
      setIsLoading(false);
    };

    fetchTenantConfig();
  }, [isTenantDomain, tenantCode]);

  return (
    <TenantContext.Provider value={{ tenantConfig, isLoading, isTenantDomain, tenantCode }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
