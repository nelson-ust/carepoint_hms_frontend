import apiClient from '../api/apiClient';

/**
 * PHASE 10: INVENTORY & STOCK MANAGEMENT
 */

export const inventoryService = {
  // Stock Levels
  getStockLevels: async (params?: any) => {
    console.log('[Inventory] Fetching stock levels...', params);
    try {
      const response = await apiClient.get('/inventory/stock', { params });
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to fetch stock levels:', error);
      throw error;
    }
  },

  // Stock Movements
  getStockMovements: async (params?: any) => {
    console.log('[Inventory] Fetching stock movements...', params);
    try {
      const response = await apiClient.get('/inventory/stock-movements', { params });
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to fetch movements:', error);
      throw error;
    }
  },

  recordStockMovement: async (data: any) => {
    console.log('[Inventory] Recording stock movement...');
    try {
      const response = await apiClient.post('/inventory/stock-movements', data);
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to record movement:', error);
      throw error;
    }
  },

  // Suppliers
  getSuppliers: async () => {
    console.log('[Inventory] Fetching suppliers...');
    try {
      const response = await apiClient.get('/inventory/suppliers');
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to fetch suppliers:', error);
      throw error;
    }
  },

  createSupplier: async (data: any) => {
    console.log('[Inventory] Creating supplier:', data.name);
    try {
      const response = await apiClient.post('/inventory/suppliers', data);
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to create supplier:', error);
      throw error;
    }
  },

  // Purchase Orders
  getPurchaseOrders: async () => {
    console.log('[Inventory] Fetching purchase orders...');
    try {
      const response = await apiClient.get('/inventory/purchase-orders');
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to fetch POs:', error);
      throw error;
    }
  },

  createPurchaseOrder: async (data: any) => {
    console.log('[Inventory] Creating purchase order...');
    try {
      const response = await apiClient.post('/inventory/purchase-orders', data);
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to create PO:', error);
      throw error;
    }
  },

  // Inventory Count / Audits
  getAudits: async () => {
    console.log('[Inventory] Fetching inventory audits...');
    try {
      const response = await apiClient.get('/inventory/audits');
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to fetch audits:', error);
      throw error;
    }
  },

  startAudit: async (data: any) => {
    console.log('[Inventory] Starting inventory audit...');
    try {
      const response = await apiClient.post('/inventory/audits', data);
      return response.data;
    } catch (error) {
      console.error('[Inventory] Failed to start audit:', error);
      throw error;
    }
  }
};
