import apiClient from '../api/apiClient';

/**
 * PHASE 3 & 14: COMMUNICATION & TEMPLATES
 */

export const communicationService = {
  // Document Templates
  getDocumentTemplates: async () => {
    console.log('[Comm] Fetching document templates...');
    try {
      const response = await apiClient.get('/templates/documents');
      return response.data;
    } catch (error) {
      console.error('[Comm] Failed to fetch document templates:', error);
      throw error;
    }
  },

  createDocumentTemplate: async (data: any) => {
    console.log('[Comm] Creating new document template:', data.name);
    try {
      const response = await apiClient.post('/templates/documents', data);
      return response.data;
    } catch (error) {
      console.error('[Comm] Failed to create document template:', error);
      throw error;
    }
  },

  // Notification Templates
  getNotificationTemplates: async () => {
    console.log('[Comm] Fetching notification templates...');
    try {
      const response = await apiClient.get('/templates/notifications');
      return response.data;
    } catch (error) {
      console.error('[Comm] Failed to fetch notification templates:', error);
      throw error;
    }
  },

  // Direct Communication
  sendBulkSMS: async (data: any) => {
    console.log('[Comm] Sending bulk SMS campaign...');
    try {
      const response = await apiClient.post('/communication/sms/bulk', data);
      return response.data;
    } catch (error) {
      console.error('[Comm] Bulk SMS failed:', error);
      throw error;
    }
  },

  sendBulkEmail: async (data: any) => {
    console.log('[Comm] Sending bulk email campaign...');
    try {
      const response = await apiClient.post('/communication/email/bulk', data);
      return response.data;
    } catch (error) {
      console.error('[Comm] Bulk email failed:', error);
      throw error;
    }
  }
};
