import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Pill, Plus, Search, Loader2, Package, Clock, AlertCircle } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  generic_name: string;
  stock_quantity: number;
  unit_price: number;
  expiry_date: string;
  category: string;
}

const PharmacyList: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedications = async () => {
    try {
      // Endpoint from integration guide: GET /pharmacy/inventory/
      const response = await apiClient.get('/pharmacy/inventory/');
      setMedications(Array.isArray(response.data) ? response.data : response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch medications', error);
      // Fallback for demo
      setMedications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const filteredMedications = medications.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.generic_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-navy-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Pharmacy Inventory</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage drug stock, pricing, and dispensing logs.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-navy-900/20">
          <Plus size={20} />
          <span>Add Stock</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by drug name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-navy-500/10 transition-all outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Medication Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Inventory</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Pricing</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMedications.map((med) => (
                <tr key={med.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-navy-600 font-black">
                        <Pill size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">{med.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{med.generic_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <Package size={14} className="text-slate-400" />
                      <span>{med.stock_quantity} Units in Stock</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-slate-900 dark:text-white">NGN {med.unit_price.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      med.stock_quantity > 10 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-rose-100 text-rose-600'
                    }`}>
                      {med.stock_quantity > 10 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMedications.length === 0 && (
            <div className="p-20 text-center">
               <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Pill size={40} />
               </div>
               <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">No Medications Found</h4>
               <p className="text-slate-500 mt-2 max-w-xs mx-auto">Either the inventory is empty or no drug matches your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyList;
