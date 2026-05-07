export const getTenantCode = (): string | null => {
  // 1. Check subdomain (e.g. acme.carepointhms.com)
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // If we have at least 3 parts (e.g. acme.localhost or acme.carepointhms.com)
  if (parts.length >= 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
    return parts[0];
  }

  // 2. Check localStorage/sessionStorage
  const stored = localStorage.getItem('tenant_code') || sessionStorage.getItem('tenant_code');
  if (stored) return stored;

  // 3. Try to extract from JWT if available
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload.tenant_code || null;
    } catch (e) {
      console.error('Failed to parse JWT for tenant_code', e);
    }
  }

  return null;
};

export const setTenantCode = (code: string) => {
  localStorage.setItem('tenant_code', code);
  sessionStorage.setItem('tenant_code', code);
};

export const getTenantDomain = (): string | null => {
  const hostname = window.location.hostname;
  return hostname.includes('carepointhms.com') ? hostname : null;
};
