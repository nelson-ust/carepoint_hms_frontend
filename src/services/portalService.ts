import apiClient from '../api/apiClient';

/**
 * PUBLIC AUTH, INVITATIONS & PATIENT PORTAL
 */

export const portalService = {
  // Public Invitations
  acceptInvitation: async (token: string, data: any) => {
    console.log('[Portal] Attempting to accept invitation...');
    try {
      const response = await apiClient.post(`/invitations/accept?token=${token}`, data);
      return response.data;
    } catch (error) {
      console.error('[Portal] Invitation acceptance failed:', error);
      throw error;
    }
  },

  verifyInvitation: async (token: string) => {
    console.log('[Portal] Verifying invitation token...');
    try {
      const response = await apiClient.get(`/invitations/verify?token=${token}`);
      return response.data;
    } catch (error) {
      console.error('[Portal] Invitation verification failed:', error);
      throw error;
    }
  },

  // Patient Portal Auth
  requestPortalOTP: async (data: any) => {
    console.log('[Portal] Requesting Patient Portal OTP for:', data.identifier);
    try {
      const response = await apiClient.post('/auth/portal/otp/request', data);
      return response.data;
    } catch (error) {
      console.error('[Portal] OTP request failed:', error);
      throw error;
    }
  },

  verifyPortalOTP: async (data: any) => {
    console.log('[Portal] Verifying Patient Portal OTP...');
    try {
      const response = await apiClient.post('/auth/portal/otp/verify', data);
      return response.data;
    } catch (error) {
      console.error('[Portal] OTP verification failed:', error);
      throw error;
    }
  },

  // Patient Portal Actions (Secure)
  getPortalResults: async () => {
    console.log('[Portal] Fetching patient results...');
    try {
      const response = await apiClient.get('/portal/results');
      return response.data;
    } catch (error) {
      console.error('[Portal] Failed to fetch results:', error);
      throw error;
    }
  },

  getPortalAppointments: async () => {
    console.log('[Portal] Fetching portal appointments...');
    try {
      const response = await apiClient.get('/portal/appointments');
      return response.data;
    } catch (error) {
      console.error('[Portal] Failed to fetch appointments:', error);
      throw error;
    }
  }
};
