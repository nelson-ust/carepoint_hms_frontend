import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Search, Filter, MoreVertical, Globe, Shield, CreditCard, Loader2 } from 'lucide-react';

interface Tenant {
  id: number;
  name: string;
  code: string;
  status: string;
  domain_url: string;
  billing_email: string;
}

const SaasTenants: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
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
    fetchTenants();
  }, []);

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
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    tenant.status === 'active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                    tenant.status === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {tenant.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400" title="Manage Subscription">
                      <CreditCard size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400" title="Support Access">
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
    </div>
  );
};

export default SaasTenants;
