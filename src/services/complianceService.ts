import apiClient from '../api/apiClient';

/**
 * PHASE 14: COMPLIANCE, GOVERNANCE & INCIDENTS
 */

export const complianceService = {
  // Accreditations
  getAccreditations: async () => {
    console.log('[Compliance] Fetching hospital accreditations...');
    try {
      const response = await apiClient.get('/compliance/accreditations');
      return response.data;
    } catch (error) {
      console.error('[Compliance] Failed to fetch accreditations:', error);
      throw error;
    }
  },

  recordAccreditation: async (data: any) => {
    console.log('[Compliance] Recording new accreditation:', data.accreditation_name);
    try {
      const response = await apiClient.post('/compliance/accreditations', data);
      return response.data;
    } catch (error) {
      console.error('[Compliance] Failed to record accreditation:', error);
      throw error;
    }
  },

  // Incident Reports
  getIncidents: async (params?: any) => {
    console.log('[Compliance] Fetching incident reports...', params);
    try {
      const response = await apiClient.get('/compliance/incidents', { params });
      return response.data;
    } catch (error) {
      console.error('[Compliance] Failed to fetch incidents:', error);
      throw error;
    }
  },

  reportIncident: async (data: any) => {
    console.log('[Compliance] Reporting new incident:', data.incident_no);
    try {
      const response = await apiClient.post('/compliance/incidents', data);
      return response.data;
    } catch (error) {
      console.error('[Compliance] Incident reporting failed:', error);
      throw error;
    }
  },

  // Compliance Dashboard
  getComplianceOverview: async () => {
    console.log('[Compliance] Fetching compliance dashboard overview...');
    try {
      const response = await apiClient.get('/compliance/dashboard');
      return response.data;
    } catch (error) {
      console.error('[Compliance] Failed to fetch compliance overview:', error);
      throw error;
    }
  }
};
