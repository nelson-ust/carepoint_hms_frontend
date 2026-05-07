import apiClient from '../api/apiClient';

/**
 * PHASE 11-14: BILLING, OPERATIONS & SPECIALIZED MODULES
 */

export const operationalService = {
  // Billing & Invoices
  getInvoices: async (params?: any) => {
    console.log('[Ops] Fetching invoices...', params);
    try {
      const response = await apiClient.get('/invoices/', { params });
      return response.data;
    } catch (error) {
      console.error('[Ops] Failed to fetch invoices:', error);
      throw error;
    }
  },

  issueInvoice: async (billingId: number) => {
    console.log(`[Ops] Issuing invoice from billing ID: ${billingId}`);
    try {
      const response = await apiClient.post('/invoices/issue-from-billing', { billing_id: billingId });
      return response.data;
    } catch (error) {
      console.error('[Ops] Invoice issuance failed:', error);
      throw error;
    }
  },

  // Payments
  receivePayment: async (data: any) => {
    console.log('[Ops] Processing payment reception...');
    try {
      const response = await apiClient.post('/payments/', data);
      return response.data;
    } catch (error) {
      console.error('[Ops] Payment processing failed:', error);
      throw error;
    }
  },

  // Inpatient (Admissions/Discharges)
  getAdmissions: async () => {
    console.log('[Ops] Fetching active admissions...');
    try {
      const response = await apiClient.get('/admissions/');
      return response.data;
    } catch (error) {
      console.error('[Ops] Failed to fetch admissions:', error);
      throw error;
    }
  },

  admitPatient: async (data: any) => {
    console.log('[Ops] Admitting patient to ward...');
    try {
      const response = await apiClient.post('/admissions/', data);
      return response.data;
    } catch (error) {
      console.error('[Ops] Admission failed:', error);
      throw error;
    }
  },

  // Ambulance
  getAmbulanceFleet: async () => {
    console.log('[Ops] Fetching ambulance fleet status...');
    try {
      const response = await apiClient.get('/ambulances/');
      return response.data;
    } catch (error) {
      console.error('[Ops] Failed to fetch ambulance fleet:', error);
      throw error;
    }
  },

  dispatchAmbulance: async (data: any) => {
    console.log('[Ops] Dispatching ambulance...');
    try {
      const response = await apiClient.post('/ambulance-calls/', data);
      return response.data;
    } catch (error) {
      console.error('[Ops] Ambulance dispatch failed:', error);
      throw error;
    }
  },

  // Reports
  getOperationalReport: async (reportType: string, params?: any) => {
    console.log(`[Ops] Generating operational report: ${reportType}`);
    try {
      const response = await apiClient.get(`/reports/operational/${reportType}`, { params });
      return response.data;
    } catch (error) {
      console.error(`[Ops] Failed to generate report ${reportType}:`, error);
      throw error;
    }
  },

  getFinancialReport: async (reportType: string, params?: any) => {
    console.log(`[Ops] Generating financial report: ${reportType}`);
    try {
      const response = await apiClient.get(`/reports/financial/${reportType}`, { params });
      return response.data;
    } catch (error) {
      console.error(`[Ops] Failed to generate report ${reportType}:`, error);
      throw error;
    }
  },

  // Specialized (Historical backward compatibility)
  getRadiologyWorklist: async () => {
    console.log('[Ops] Fetching radiology worklist...');
    try {
      const response = await apiClient.get('/radiology/orders/worklist');
      return response.data;
    } catch (error) {
      console.error('[Ops] Failed to fetch radiology worklist:', error);
      throw error;
    }
  },

  getSurgicalWorklist: async () => {
    console.log('[Ops] Fetching surgical theatre worklist...');
    try {
      const response = await apiClient.get('/surgical/cases/worklist');
      return response.data;
    } catch (error) {
      console.error('[Ops] Failed to fetch surgical worklist:', error);
      throw error;
    }
  }
};
