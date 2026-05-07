import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Shield, Loader2, X, Check, Clock, User, Building2, AlertCircle } from 'lucide-react';

interface SupportGrant {
  id: number;
  saas_admin_id: number;
  tenant_id: number;
  reason: string;
  status: string;
  valid_from: string;
  valid_until: string;
  approved_at: string | null;
  revoked_at: string | null;
  tenant_name?: string; // We'll try to map this if possible
}

const SaasSupportAccess: React.FC = () => {
  const [grants, setGrants] = useState<SupportGrant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<number | null>(null);

  const fetchGrants = async () => {
    try {
      const response = await apiClient.get('/support-access');
      setGrants(response.data || []);
    } catch (error) {
      console.error('Failed to fetch grants', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrants();
  }, []);

  const handleRevoke = async (id: number) => {
    if (!window.confirm('Are you sure you want to revoke this support access grant?')) return;
    setIsProcessing(id);
    try {
      await apiClient.post(`/support-access/${id}/revoke`);
      fetchGrants();
    } catch (error) {
      console.error('Revoke failed', error);
    } finally {
      setIsProcessing(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-600';
      case 'pending': return 'bg-amber-100 text-amber-600';
      case 'revoked': return 'bg-red-100 text-red-600';
      case 'expired': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Support Engagements</h3>
        <p className="text-slate-500 dark:text-slate-400">Monitor and audit all administrative access grants to tenant environments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {grants.map((grant) => (
          <div key={grant.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-[0.2em] ${getStatusColor(grant.status)}`}>
               {grant.status}
            </div>
            
            <div className="flex items-start gap-6">
               <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600">
                  <Shield size={32} />
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tenant ID: {grant.tenant_id}</span>
                  </div>
                  <h4 className="text-lg font-black tracking-tight">{grant.reason}</h4>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                     <div className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" />
                        <div className="text-[10px]">
                           <p className="text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Expires</p>
                           <p className="font-bold text-slate-700 dark:text-slate-300">{new Date(grant.valid_until).toLocaleString()}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        <div className="text-[10px]">
                           <p className="text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Admin ID</p>
                           <p className="font-bold text-slate-700 dark:text-slate-300">Admin #{grant.saas_admin_id}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
               <div className="text-[10px] font-medium text-slate-400 italic">
                  Grant ID: CP-SUP-{grant.id.toString().padStart(4, '0')}
               </div>
               {grant.status.toLowerCase() === 'active' && (
                 <button 
                  onClick={() => handleRevoke(grant.id)}
                  disabled={isProcessing === grant.id}
                  className="px-6 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50"
                 >
                   {isProcessing === grant.id ? 'Revoking...' : 'Revoke Access'}
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>

      {grants.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center">
           <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Shield size={40} />
           </div>
           <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">No Active Grants</h4>
           <p className="text-slate-500 mt-2 max-w-xs mx-auto">Access control history is currently empty. Use the Tenants tab to request support access if needed.</p>
        </div>
      )}
    </div>
  );
};

export default SaasSupportAccess;
