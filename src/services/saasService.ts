import apiClient from '../api/apiClient';

/**
 * PHASE 1 & 2: SAAS ADMINISTRATION & TENANT ONBOARDING
 */

export const saasService = {
  // SaaS Administrators
  getAdmins: async () => {
    console.log('[SaaS] Fetching administrators...');
    try {
      const response = await apiClient.get('/saas/admins');
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch admins:', error);
      throw error;
    }
  },

  createAdmin: async (data: any) => {
    console.log('[SaaS] Creating new administrator:', data.email);
    try {
      const response = await apiClient.post('/saas/admins', data);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to create admin:', error);
      throw error;
    }
  },

  // Subscription Plans
  getPlans: async () => {
    console.log('[SaaS] Fetching subscription plans...');
    try {
      const response = await apiClient.get('/saas/plans');
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch plans:', error);
      throw error;
    }
  },

  createPlan: async (data: any) => {
    console.log('[SaaS] Creating new plan:', data.name);
    try {
      const response = await apiClient.post('/saas/plans', data);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to create plan:', error);
      throw error;
    }
  },

  // Tenants
  getTenants: async (params?: any) => {
    console.log('[SaaS] Fetching tenants...', params);
    try {
      const response = await apiClient.get('/tenants', { params });
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch tenants:', error);
      throw error;
    }
  },

  registerTenant: async (data: any) => {
    console.log('[SaaS] Registering new tenant:', data.tenant_name);
    try {
      const response = await apiClient.post('/tenants/register', data);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to register tenant:', error);
      throw error;
    }
  },

  approveTenant: async (tenantId: string | number) => {
    console.log(`[SaaS] Approving tenant ID: ${tenantId}`);
    try {
      const response = await apiClient.post(`/tenants/${tenantId}/approve`);
      return response.data;
    } catch (error) {
      console.error(`[SaaS] Failed to approve tenant ${tenantId}:`, error);
      throw error;
    }
  },

  // Edge Nodes
  getEdgeNodes: async () => {
    console.log('[SaaS] Fetching edge nodes...');
    try {
      const response = await apiClient.get('/edge-nodes');
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch edge nodes:', error);
      throw error;
    }
  },

  provisionEdgeNode: async (data: any) => {
    console.log('[SaaS] Provisioning edge node:', data.display_name);
    try {
      const response = await apiClient.post('/edge-nodes', data);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to provision edge node:', error);
      throw error;
    }
  },

  // SaaS Notifications
  getNotifications: async () => {
    console.log('[SaaS] Fetching in-app notifications...');
    try {
      const response = await apiClient.get('/saas/notifications');
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch notifications:', error);
      throw error;
    }
  },

  markNotificationRead: async (notificationId: number | string) => {
    console.log(`[SaaS] Marking notification ${notificationId} as read`);
    try {
      const response = await apiClient.patch(`/saas/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to mark notification read:', error);
      throw error;
    }
  },

  // Subscription Billing (SaaS Admin view)
  getSubscriptionInvoices: async () => {
    console.log('[SaaS] Fetching global subscription invoices...');
    try {
      const response = await apiClient.get('/subscription-billing/invoices');
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch subscription invoices:', error);
      throw error;
    }
  },

  issueSubscriptionInvoice: async (data: any) => {
    console.log('[SaaS] Manually issuing subscription invoice...');
    try {
      const response = await apiClient.post('/subscription-billing/invoices/issue', data);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to issue invoice:', error);
      throw error;
    }
  },

  // Support Access
  getSupportAccessGrants: async () => {
    console.log('[SaaS] Fetching support access grants...');
    try {
      const response = await apiClient.get('/support-access');
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch support grants:', error);
      throw error;
    }
  },

  approveSupportGrant: async (grantId: number | string) => {
    console.log(`[SaaS] Approving support grant ${grantId}`);
    try {
      const response = await apiClient.post(`/support-access/${grantId}/approve`);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to approve support grant:', error);
      throw error;
    }
  },

  // Tenant Domains
  getTenantDomains: async (tenantId: number | string) => {
    console.log(`[SaaS] Fetching domains for tenant ${tenantId}`);
    try {
      const response = await apiClient.get(`/tenant-domains/${tenantId}`);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch tenant domains:', error);
      throw error;
    }
  },

  // Usage Tracking
  getTenantUsage: async (tenantId: number | string) => {
    console.log(`[SaaS] Fetching usage metrics for tenant ${tenantId}`);
    try {
      const response = await apiClient.get(`/saas/usage/${tenantId}`);
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch usage metrics:', error);
      throw error;
    }
  },

  // SaaS Dashboard Metrics (Comprehensive)
  getDashboardOverview: async () => {
    console.log('[SaaS] Fetching dashboard overview...');
    try {
      const response = await apiClient.get('/saas/dashboard/overview');
      return response.data;
    } catch (error) {
      console.error('[SaaS] Failed to fetch SaaS overview:', error);
      throw error;
    }
  }
};

/**
 * PHASE 4: AUTHENTICATION & RBAC
 */
export const authService = {
  login: async (credentials: any) => {
    console.log('[Auth] Attempting login for:', credentials.email);
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('[Auth] Login failed:', error);
      throw error;
    }
  },

  getMe: async () => {
    console.log('[Auth] Fetching current user profile...');
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('[Auth] Failed to fetch profile:', error);
      throw error;
    }
  }
};
