import apiClient from '../api/apiClient';

/**
 * PHASE 10: PHARMACY & DISPENSING
 */

export const pharmacyService = {
  // Prescriptions
  createPrescription: async (data: any) => {
    console.log('[Pharmacy] Authoring new prescription...');
    try {
      const response = await apiClient.post('/prescriptions/', data);
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Prescription creation failed:', error);
      throw error;
    }
  },

  getPrescriptionsByVisit: async (visitId: number | string) => {
    console.log(`[Pharmacy] Fetching prescriptions for visit ${visitId}`);
    try {
      const response = await apiClient.get(`/prescriptions/visits/${visitId}`);
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Failed to fetch prescriptions:', error);
      throw error;
    }
  },

  cancelPrescription: async (prescriptionId: number | string, data: any) => {
    console.log(`[Pharmacy] Cancelling prescription ${prescriptionId}`);
    try {
      const response = await apiClient.post(`/prescriptions/${prescriptionId}/cancel`, data);
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Prescription cancellation failed:', error);
      throw error;
    }
  },

  // Dispenses
  createDispense: async (data: any) => {
    console.log('[Pharmacy] Creating new dispense from prescription...');
    try {
      const response = await apiClient.post('/dispenses/', data);
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Dispense failed:', error);
      throw error;
    }
  },

  getDispensesByPrescription: async (prescriptionId: number | string) => {
    console.log(`[Pharmacy] Fetching dispenses for prescription ${prescriptionId}`);
    try {
      const response = await apiClient.get(`/dispenses/prescriptions/${prescriptionId}`);
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Failed to fetch prescription dispenses:', error);
      throw error;
    }
  },

  getDispensesByVisit: async (visitId: number | string) => {
    console.log(`[Pharmacy] Fetching dispenses for visit ${visitId}`);
    try {
      const response = await apiClient.get(`/dispenses/visits/${visitId}`);
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Failed to fetch visit dispenses:', error);
      throw error;
    }
  },

  getDispenseDetails: async (dispenseId: number | string) => {
    console.log(`[Pharmacy] Fetching details for dispense ${dispenseId}`);
    try {
      const response = await apiClient.get(`/dispenses/${dispenseId}`);
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Failed to fetch dispense details:', error);
      throw error;
    }
  },

  // Pharmacy Workstation
  getPharmacyWorklist: async () => {
    console.log('[Pharmacy] Fetching pharmacy worklist...');
    try {
      const response = await apiClient.get('/pharmacy/worklist');
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Failed to fetch pharmacy worklist:', error);
      throw error;
    }
  },

  getStockAlerts: async () => {
    console.log('[Pharmacy] Fetching pharmacy stock alerts...');
    try {
      const response = await apiClient.get('/pharmacy/stock-alerts');
      return response.data;
    } catch (error) {
      console.error('[Pharmacy] Failed to fetch stock alerts:', error);
      throw error;
    }
  }
};
