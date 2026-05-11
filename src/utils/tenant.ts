export const getTenantCode = (): string | null => {
  // 1. Check subdomain (e.g. acme.carepointhms.com)
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // If we have at least 2 parts and the first part is not a system domain
  // If we have at least 2 parts
  const systemSubdomains = ['www', 'localhost', 'carepointhms', 'api', 'admin'];
  
  let tenantPart = parts[0].toLowerCase();
  
  // If the first part is 'www', look at the second part
  if (tenantPart === 'www' && parts.length >= 3) {
    tenantPart = parts[1].toLowerCase();
  }

  // Ensure tenantPart is a valid slug (no @, no dots)
  const isValidSlug = /^[a-z0-9-]+$/.test(tenantPart);

  if (isValidSlug && !systemSubdomains.includes(tenantPart)) {
    return tenantPart.toUpperCase();
  }

  // 2. Check localStorage/sessionStorage
  const stored = localStorage.getItem('tenant_code') || sessionStorage.getItem('tenant_code');
  if (stored && /^[A-Z0-9-]+$/.test(stored.toUpperCase())) {
    return stored.toUpperCase();
  }

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
