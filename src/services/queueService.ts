import apiClient from '../api/apiClient';

/**
 * PHASE 7: QUEUE, ROUTING & WORKLISTS
 */

export const queueService = {
  // My Worklist (Personalized for the logged-in staff's assigned point)
  getMyWorklist: async () => {
    console.log('[Queue] Fetching your assigned workstation worklist...');
    try {
      const response = await apiClient.get('/queue/my-worklist');
      return response.data;
    } catch (error) {
      console.error('[Queue] Failed to fetch personal worklist:', error);
      throw error;
    }
  },

  // Service Point Worklists
  getWorklistByServicePoint: async (servicePointId: number | string) => {
    console.log(`[Queue] Fetching worklist for service point ${servicePointId}`);
    try {
      const response = await apiClient.get(`/queue/service-points/${servicePointId}/worklist`);
      return response.data;
    } catch (error) {
      console.error('[Queue] Failed to fetch service point worklist:', error);
      throw error;
    }
  },

  // Ticket Actions
  callNext: async (ticketId: number | string) => {
    console.log(`[Queue] Calling ticket ${ticketId} to service point...`);
    try {
      const response = await apiClient.post(`/queue/tickets/${ticketId}/call`);
      return response.data;
    } catch (error) {
      console.error('[Queue] Failed to call ticket:', error);
      throw error;
    }
  },

  startService: async (ticketId: number | string) => {
    console.log(`[Queue] Starting service for ticket ${ticketId}...`);
    try {
      const response = await apiClient.post(`/queue/tickets/${ticketId}/start`);
      return response.data;
    } catch (error) {
      console.error('[Queue] Failed to start service:', error);
      throw error;
    }
  },

  endService: async (ticketId: number | string) => {
    console.log(`[Queue] Ending service for ticket ${ticketId}...`);
    try {
      const response = await apiClient.post(`/queue/tickets/${ticketId}/end`);
      return response.data;
    } catch (error) {
      console.error('[Queue] Failed to end service:', error);
      throw error;
    }
  },

  transferTicket: async (ticketId: number | string, data: any) => {
    console.log(`[Queue] Transferring ticket ${ticketId} to another point...`);
    try {
      const response = await apiClient.post(`/queue/tickets/${ticketId}/transfer`, data);
      return response.data;
    } catch (error) {
      console.error('[Queue] Ticket transfer failed:', error);
      throw error;
    }
  }
};
