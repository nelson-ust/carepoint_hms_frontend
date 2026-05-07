import apiClient from '../api/apiClient';

/**
 * PHASE 13: SPECIALIZED CLINICAL MODULES (Procedures, Radiology, Surgical)
 */

export const specializedService = {
  // Procedures
  getProceduresCatalog: async () => {
    console.log('[Specialized] Fetching procedures catalog...');
    try {
      const response = await apiClient.get('/procedures/');
      return response.data;
    } catch (error) {
      console.error('[Specialized] Failed to fetch procedures:', error);
      throw error;
    }
  },

  orderProcedure: async (data: any) => {
    console.log('[Specialized] Ordering procedure...');
    try {
      const response = await apiClient.post('/procedure-orders/', data);
      return response.data;
    } catch (error) {
      console.error('[Specialized] Procedure order failed:', error);
      throw error;
    }
  },

  getProcedureWorklist: async () => {
    console.log('[Specialized] Fetching procedure worklist...');
    try {
      const response = await apiClient.get('/procedure-orders/worklist');
      return response.data;
    } catch (error) {
      console.error('[Specialized] Failed to fetch procedure worklist:', error);
      throw error;
    }
  },

  // Radiology
  getRadiologyCatalog: async () => {
    console.log('[Specialized] Fetching radiology catalog...');
    try {
      const response = await apiClient.get('/radiology/');
      return response.data;
    } catch (error) {
      console.error('[Specialized] Failed to fetch radiology catalog:', error);
      throw error;
    }
  },

  orderRadiology: async (data: any) => {
    console.log('[Specialized] Ordering radiology exam...');
    try {
      const response = await apiClient.post('/radiology-orders/', data);
      return response.data;
    } catch (error) {
      console.error('[Specialized] Radiology order failed:', error);
      throw error;
    }
  },

  submitRadiologyReport: async (data: any) => {
    console.log('[Specialized] Submitting radiology report...');
    try {
      const response = await apiClient.post('/radiology-reports/', data);
      return response.data;
    } catch (error) {
      console.error('[Specialized] Radiology report submission failed:', error);
      throw error;
    }
  },

  // Surgical
  getTheatres: async () => {
    console.log('[Specialized] Fetching surgical theatres...');
    try {
      const response = await apiClient.get('/theatres/');
      return response.data;
    } catch (error) {
      console.error('[Specialized] Failed to fetch theatres:', error);
      throw error;
    }
  },

  createSurgicalCase: async (data: any) => {
    console.log('[Specialized] Creating surgical case...');
    try {
      const response = await apiClient.post('/surgical-cases/', data);
      return response.data;
    } catch (error) {
      console.error('[Specialized] Surgical case creation failed:', error);
      throw error;
    }
  },

  updateSurgicalChecklist: async (caseId: number, data: any) => {
    console.log(`[Specialized] Updating surgical checklist for case ${caseId}`);
    try {
      const response = await apiClient.put(`/surgical-checklists/${caseId}`, data);
      return response.data;
    } catch (error) {
      console.error('[Specialized] Checklist update failed:', error);
      throw error;
    }
  }
};
