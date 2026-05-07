import apiClient from '../api/apiClient';

/**
 * PHASE 5: ADVANCED HR & ROSTERING
 */

export const hrService = {
  // Shifts
  getShifts: async () => {
    console.log('[HR] Fetching shift configurations...');
    try {
      const response = await apiClient.get('/hr/shifts');
      return response.data;
    } catch (error) {
      console.error('[HR] Failed to fetch shifts:', error);
      throw error;
    }
  },

  createShift: async (data: any) => {
    console.log('[HR] Creating shift:', data.name);
    try {
      const response = await apiClient.post('/hr/shifts', data);
      return response.data;
    } catch (error) {
      console.error('[HR] Failed to create shift:', error);
      throw error;
    }
  },

  // Rostering
  getRoster: async (params?: any) => {
    console.log('[HR] Fetching staff roster...', params);
    try {
      const response = await apiClient.get('/hr/rosters', { params });
      return response.data;
    } catch (error) {
      console.error('[HR] Failed to fetch roster:', error);
      throw error;
    }
  },

  assignRoster: async (data: any) => {
    console.log('[HR] Assigning staff to roster...');
    try {
      const response = await apiClient.post('/hr/rosters/assign', data);
      return response.data;
    } catch (error) {
      console.error('[HR] Roster assignment failed:', error);
      throw error;
    }
  },

  // Attendance
  getAttendance: async (params?: any) => {
    console.log('[HR] Fetching attendance logs...', params);
    try {
      const response = await apiClient.get('/hr/attendance', { params });
      return response.data;
    } catch (error) {
      console.error('[HR] Failed to fetch attendance:', error);
      throw error;
    }
  },

  clockIn: async (data: any) => {
    console.log('[HR] Staff clock-in...');
    try {
      const response = await apiClient.post('/hr/attendance/clock-in', data);
      return response.data;
    } catch (error) {
      console.error('[HR] Clock-in failed:', error);
      throw error;
    }
  },

  // Leave Management
  getLeaveRequests: async () => {
    console.log('[HR] Fetching leave requests...');
    try {
      const response = await apiClient.get('/hr/leave-requests');
      return response.data;
    } catch (error) {
      console.error('[HR] Failed to fetch leave requests:', error);
      throw error;
    }
  },

  // Payroll Config (Advanced)
  getPayrollStructure: async () => {
    console.log('[HR] Fetching payroll structure...');
    try {
      const response = await apiClient.get('/hr/payroll/structures');
      return response.data;
    } catch (error) {
      console.error('[HR] Failed to fetch payroll structure:', error);
      throw error;
    }
  }
};
