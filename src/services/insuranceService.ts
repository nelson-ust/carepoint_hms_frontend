import apiClient from '../api/apiClient';

/**
 * PHASE 11: INSURANCE & CLAIMS MANAGEMENT
 */

export const insuranceService = {
  // Insurance Providers
  getProviders: async () => {
    console.log('[Insurance] Fetching insurance providers...');
    try {
      const response = await apiClient.get('/insurance/providers');
      return response.data;
    } catch (error) {
      console.error('[Insurance] Failed to fetch providers:', error);
      throw error;
    }
  },

  createProvider: async (data: any) => {
    console.log('[Insurance] Creating insurance provider:', data.name);
    try {
      const response = await apiClient.post('/insurance/providers', data);
      return response.data;
    } catch (error) {
      console.error('[Insurance] Failed to create provider:', error);
      throw error;
    }
  },

  // Insurance Schemes
  getSchemes: async (providerId?: number | string) => {
    console.log('[Insurance] Fetching insurance schemes...');
    try {
      const response = await apiClient.get('/insurance/schemes', { params: { provider_id: providerId } });
      return response.data;
    } catch (error) {
      console.error('[Insurance] Failed to fetch schemes:', error);
      throw error;
    }
  },

  // Claims Management
  getClaims: async (params?: any) => {
    console.log('[Insurance] Fetching insurance claims...', params);
    try {
      const response = await apiClient.get('/insurance/claims', { params });
      return response.data;
    } catch (error) {
      console.error('[Insurance] Failed to fetch claims:', error);
      throw error;
    }
  },

  submitClaim: async (data: any) => {
    console.log('[Insurance] Submitting insurance claim...');
    try {
      const response = await apiClient.post('/insurance/claims/submit', data);
      return response.data;
    } catch (error) {
      console.error('[Insurance] Claim submission failed:', error);
      throw error;
    }
  },

  updateClaimStatus: async (claimId: number | string, data: any) => {
    console.log(`[Insurance] Updating claim ${claimId} status...`);
    try {
      const response = await apiClient.patch(`/insurance/claims/${claimId}/status`, data);
      return response.data;
    } catch (error) {
      console.error('[Insurance] Failed to update claim status:', error);
      throw error;
    }
  },

  // Corporate Partners
  getCorporatePartners: async () => {
    console.log('[Insurance] Fetching corporate billing partners...');
    try {
      const response = await apiClient.get('/insurance/corporate-partners');
      return response.data;
    } catch (error) {
      console.error('[Insurance] Failed to fetch partners:', error);
      throw error;
    }
  }
};
