export const getTenantCode = (): string | null => {
  // 1. Check subdomain (e.g. acme.carepointhms.com)
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // If we have at least 3 parts (e.g. acme.localhost or acme.carepointhms.com)
  if (parts.length >= 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
    return parts[0];
  }

  // 2. Fallback to localStorage (for development or non-subdomain testing)
  return localStorage.getItem('tenant_code');
};

export const setTenantCode = (code: string) => {
  localStorage.setItem('tenant_code', code);
};
