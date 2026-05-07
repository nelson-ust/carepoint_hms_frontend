import apiClient from '../api/apiClient';

/**
 * PHASE 3-5: TENANT CONFIGURATION, AUTH & ORGANISATION
 */

export const tenantService = {
  // Tenant Settings
  getSettings: async () => {
    console.log('[Tenant] Fetching tenant settings...');
    try {
      const response = await apiClient.get('/settings');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch settings:', error);
      throw error;
    }
  },

  updateSettings: async (data: any) => {
    console.log('[Tenant] Updating settings...');
    try {
      const response = await apiClient.put('/settings', data);
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to update settings:', error);
      throw error;
    }
  },

  // Backups
  getBackups: async () => {
    console.log('[Tenant] Fetching database backups...');
    try {
      const response = await apiClient.get('/backups');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch backups:', error);
      throw error;
    }
  },

  triggerBackup: async () => {
    console.log('[Tenant] Triggering database backup...');
    try {
      const response = await apiClient.post('/backups');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to trigger backup:', error);
      throw error;
    }
  },

  // Email Configuration
  getEmailConfigs: async () => {
    console.log('[Tenant] Fetching email provider configurations...');
    try {
      const response = await apiClient.get('/tenant-email-config');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch email configs:', error);
      throw error;
    }
  },

  testEmailConfig: async (configId: number | string, data: any) => {
    console.log(`[Tenant] Testing email config ${configId}...`);
    try {
      const response = await apiClient.post(`/tenant-email-config/${configId}/send-test`, data);
      return response.data;
    } catch (error) {
      console.error('[Tenant] Email test failed:', error);
      throw error;
    }
  },

  // Payment Methods
  getPaymentMethods: async () => {
    console.log('[Tenant] Fetching payment method configurations...');
    try {
      const response = await apiClient.get('/tenant-payment-methods');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch payment methods:', error);
      throw error;
    }
  },

  // Background Jobs
  getBackgroundJobs: async () => {
    console.log('[Tenant] Fetching scheduled background jobs...');
    try {
      const response = await apiClient.get('/backups/jobs'); // Adjusting path based on guide grep
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch background jobs:', error);
      throw error;
    }
  },

  // Organisation (Facilities/Branches)
  getFacilities: async () => {
    console.log('[Tenant] Fetching facilities...');
    try {
      const response = await apiClient.get('/facilities');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch facilities:', error);
      throw error;
    }
  },

  createFacility: async (data: any) => {
    console.log('[Tenant] Creating new facility:', data.name);
    try {
      const response = await apiClient.post('/facilities', data);
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to create facility:', error);
      throw error;
    }
  },

  // Ward & Bed Management
  getWards: async () => {
    console.log('[Tenant] Fetching wards...');
    try {
      const response = await apiClient.get('/wards/');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch wards:', error);
      throw error;
    }
  },

  getBeds: async (wardId?: number | string) => {
    console.log('[Tenant] Fetching beds...', wardId ? `for ward ${wardId}` : '');
    try {
      const response = await apiClient.get('/beds/', { params: { ward_id: wardId } });
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch beds:', error);
      throw error;
    }
  },

  // HR & Staff
  getStaff: async () => {
    console.log('[Tenant] Fetching staff list...');
    try {
      const response = await apiClient.get('/staff/');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch staff:', error);
      throw error;
    }
  },

  getDepartments: async () => {
    console.log('[Tenant] Fetching departments...');
    try {
      const response = await apiClient.get('/departments/');
      return response.data;
    } catch (error) {
      console.error('[Tenant] Failed to fetch departments:', error);
      throw error;
    }
  }
};
