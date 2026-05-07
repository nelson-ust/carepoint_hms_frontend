import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Search, Filter, MoreVertical, Globe, Shield, Loader2, X, Lock } from 'lucide-react';

interface Tenant {
  id: number;
  name: string;
  code: string;
  status: string;
  domain_url: string;
  billing_email: string;
}

interface Module {
  code: string;
  label: string;
  effective: boolean;
}

const SaasTenants: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  
  // Modal States
  const [activeModal, setActiveModal] = useState<'support' | 'modules' | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  
  // Support Modal Form
  const [supportReason, setSupportReason] = useState('');
  const [supportHours, setSupportHours] = useState(24);
  
  // Modules Modal Data
  const [modules, setModules] = useState<Module[]>([]);
  const [isModulesLoading, setIsModulesLoading] = useState(false);

  const fetchTenants = async () => {
    try {
      const response = await apiClient.get('/tenants');
      setTenants(response.data.tenants || []);
    } catch (error) {
      console.error('Failed to fetch tenants', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleApprove = async (tenantId: number) => {
    if (!window.confirm('Are you sure you want to approve this tenant? This will provision their database.')) return;
    setIsProcessing(tenantId);
    try {
      await apiClient.post(`/tenants/${tenantId}/approve`);
      alert('Tenant approved successfully!');
      fetchTenants();
    } catch (error) {
      console.error('Failed to approve tenant', error);
      alert('Failed to approve tenant.');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleUpdateStatus = async (tenantId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    if (!window.confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'suspend'} this tenant?`)) return;
    
    setIsProcessing(tenantId);
    try {
      await apiClient.put(`/tenants/${tenantId}/status`, { status: newStatus });
      fetchTenants();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status.');
    } finally {
      setIsProcessing(null);
    }
  };

  const openSupportModal = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setActiveModal('support');
    setSupportReason('');
  };

  const openModulesModal = async (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setActiveModal('modules');
    setIsModulesLoading(true);
    try {
      const response = await apiClient.get(`/tenant-modules/${tenant.id}`);
      setModules(response.data);
    } catch (error) {
      console.error('Failed to fetch modules', error);
    } finally {
      setIsModulesLoading(false);
    }
  };

  const handleRequestSupport = async () => {
    if (!selectedTenant || !supportReason) return;
    setIsProcessing(selectedTenant.id);
    try {
      await apiClient.post('/support-access/request', {
        tenant_id: selectedTenant.id,
        reason: supportReason,
        valid_hours: supportHours
      });
      alert('Support access requested!');
      setActiveModal(null);
    } catch (error) {
      console.error('Support request failed', error);
      alert('Request failed.');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleToggleModule = async (moduleCode: string, currentStatus: boolean) => {
    if (!selectedTenant) return;
    try {
      await apiClient.put(`/tenant-modules/${selectedTenant.id}`, {
        module_code: moduleCode,
        is_enabled: !currentStatus
      });
      // Refresh local modules state
      setModules(prev => prev.map(m => m.code === moduleCode ? { ...m, effective: !currentStatus } : m));
    } catch (error) {
      console.error('Module toggle failed', error);
    }
  };

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.code.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tenant Management</h3>
          <p className="text-slate-500 dark:text-slate-400">Monitor and manage all onboarded hospitals.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm w-64 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4">Hospital / Tenant</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">{tenant.name}</span>
                    <span className="text-xs text-slate-500">{tenant.code} • {tenant.billing_email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Globe size={14} />
                    <a href={`https://${tenant.domain_url}`} target="_blank" rel="noreferrer" className="hover:text-primary-600 hover:underline">
                      {tenant.domain_url}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${tenant.status === 'active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                      tenant.status === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                        tenant.status === 'suspended' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                          'bg-slate-100 text-slate-500'
                    }`}>
                    {tenant.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {tenant.status === 'pending' && (
                      <button
                        onClick={() => handleApprove(tenant.id)}
                        disabled={isProcessing === tenant.id}
                        className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50"
                      >
                        {isProcessing === tenant.id ? 'Approving...' : 'Approve'}
                      </button>
                    )}
                    {tenant.status !== 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(tenant.id, tenant.status)}
                        disabled={isProcessing === tenant.id}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all disabled:opacity-50 ${tenant.status === 'active'
                            ? 'border-red-200 text-red-600 hover:bg-red-50'
                            : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                      >
                        {isProcessing === tenant.id ? '...' : (tenant.status === 'active' ? 'Suspend' : 'Activate')}
                      </button>
                    )}
                    <button 
                      onClick={() => openModulesModal(tenant)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400" 
                      title="Manage Modules"
                    >
                      <Lock size={18} />
                    </button>
                    <button 
                      onClick={() => openSupportModal(tenant)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400" 
                      title="Support Access"
                    >
                      <Shield size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTenants.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No tenants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Support Access Modal */}
      {activeModal === 'support' && selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeInUp">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-600/20">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Support Access</h3>
                    <p className="text-xs text-slate-500">Request temporary access to {selectedTenant.name}</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Reason for Access</label>
                  <textarea 
                    value={supportReason}
                    onChange={(e) => setSupportReason(e.target.value)}
                    placeholder="e.g. Troubleshooting database migration issues..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 min-h-[120px] outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Duration (Hours)</label>
                  <input 
                    type="number"
                    value={supportHours}
                    onChange={(e) => setSupportHours(parseInt(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="flex-1 px-6 py-3 rounded-2xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRequestSupport}
                  disabled={!supportReason || isProcessing === selectedTenant.id}
                  className="flex-1 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20 disabled:opacity-50"
                >
                  {isProcessing === selectedTenant.id ? 'Requesting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modules Modal */}
      {activeModal === 'modules' && selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeInUp">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-600/20">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Module Governance</h3>
                    <p className="text-xs text-slate-500">Manage feature flags for {selectedTenant.name}</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              {isModulesLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <Loader2 className="animate-spin text-primary-600" size={32} />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {modules.map((m) => (
                    <div key={m.code} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <div>
                        <p className="font-bold text-sm">{m.label}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black">{m.code}</p>
                      </div>
                      <button 
                        onClick={() => handleToggleModule(m.code, m.effective)}
                        className={`w-12 h-6 rounded-full transition-all relative ${m.effective ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${m.effective ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaasTenants;
