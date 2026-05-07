import apiClient from '../api/apiClient';

/**
 * PHASE 6-10: CLINICAL WORKFLOWS
 */

export const clinicalService = {
  // Patient MPI
  getPatients: async (params?: any) => {
    console.log('[Clinical] Fetching patient records...', params);
    try {
      const response = await apiClient.get('/patients', { params });
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch patients:', error);
      throw error;
    }
  },

  registerPatient: async (data: any) => {
    console.log('[Clinical] Registering new patient:', data.first_name);
    try {
      const response = await apiClient.post('/patients/', data);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Patient registration failed:', error);
      throw error;
    }
  },

  // Triage
  getTriageWorklist: async () => {
    console.log('[Clinical] Fetching triage worklist...');
    try {
      const response = await apiClient.get('/triage/worklist');
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch triage worklist:', error);
      throw error;
    }
  },

  performTriage: async (data: any) => {
    console.log('[Clinical] Performing triage for visit:', data.visit_id);
    try {
      const response = await apiClient.post('/triage/', data);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Triage submission failed:', error);
      throw error;
    }
  },

  // Appointments
  getAppointments: async (params?: any) => {
    console.log('[Clinical] Fetching appointments...', params);
    try {
      const response = await apiClient.get('/appointments/', { params });
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch appointments:', error);
      throw error;
    }
  },

  scheduleAppointment: async (data: any) => {
    console.log('[Clinical] Scheduling new appointment...');
    try {
      const response = await apiClient.post('/appointments/', data);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Appointment scheduling failed:', error);
      throw error;
    }
  },

  // Laboratory
  getLabWorklist: async () => {
    console.log('[Clinical] Fetching lab worklist...');
    try {
      const response = await apiClient.get('/lab/orders/worklist');
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch lab worklist:', error);
      throw error;
    }
  },

  submitLabResult: async (data: any) => {
    console.log('[Clinical] Submitting laboratory result...');
    try {
      const response = await apiClient.post('/lab/results/', data);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to submit lab result:', error);
      throw error;
    }
  },

  // Pharmacy
  getPharmacyWorklist: async () => {
    console.log('[Clinical] Fetching pharmacy worklist...');
    try {
      const response = await apiClient.get('/pharmacy/worklist');
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch pharmacy worklist:', error);
      throw error;
    }
  },

  // Referrals
  getReferrals: async (params?: any) => {
    console.log('[Clinical] Fetching patient referrals...', params);
    try {
      const response = await apiClient.get('/referrals/', { params });
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch referrals:', error);
      throw error;
    }
  },

  createReferral: async (data: any) => {
    console.log('[Clinical] Creating new referral...');
    try {
      const response = await apiClient.post('/referrals/', data);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Referral creation failed:', error);
      throw error;
    }
  },

  // Nursing & Inpatient Care
  getNursingWorklist: async () => {
    console.log('[Clinical] Fetching nursing worklist...');
    try {
      const response = await apiClient.get('/nursing/worklist');
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch nursing worklist:', error);
      throw error;
    }
  },

  recordNursingNote: async (data: any) => {
    console.log('[Clinical] Recording nursing note...');
    try {
      const response = await apiClient.post('/nursing-notes/', data);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to record nursing note:', error);
      throw error;
    }
  },

  // Discharges
  initiateDischarge: async (data: any) => {
    console.log('[Clinical] Initiating discharge process...');
    try {
      const response = await apiClient.post('/discharges/initiate', data);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Discharge initiation failed:', error);
      throw error;
    }
  },

  getDischargeSummary: async (admissionId: number | string) => {
    console.log(`[Clinical] Fetching discharge summary for admission ${admissionId}`);
    try {
      const response = await apiClient.get(`/discharges/summary/${admissionId}`);
      return response.data;
    } catch (error) {
      console.error('[Clinical] Failed to fetch discharge summary:', error);
      throw error;
    }
  }
};
