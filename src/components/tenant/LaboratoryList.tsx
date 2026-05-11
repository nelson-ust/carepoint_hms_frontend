import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Microscope, Plus, Search, Loader2, User, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface LabOrder {
  id: number;
  patient_name: string;
  test_name: string;
  ordered_by: string;
  order_date: string;
  status: 'PENDING' | 'SAMPLE_COLLECTED' | 'RESULT_READY' | 'VALIDATED';
  urgency: 'ROUTINE' | 'URGENT' | 'STAT';
}

const LaboratoryList: React.FC = () => {
  const [orders, setOrders] = useState<LabOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      // Endpoint from integration guide: GET /lab/orders/
      const response = await apiClient.get('/lab/orders/');
      setOrders(Array.isArray(response.data) ? response.data : response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch lab orders', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'VALIDATED': return 'bg-emerald-100 text-emerald-600';
      case 'RESULT_READY': return 'bg-blue-100 text-blue-600';
      case 'PENDING': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Laboratory Worklist</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage lab investigations, results, and sample tracking.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-navy-900/20">
          <Plus size={20} />
          <span>New Lab Order</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by patient or test name..."
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Patient & Test</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Ordered By</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Priority</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-navy-600 font-black">
                        <Microscope size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">{order.patient_name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.test_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600 dark:text-slate-400">
                     {order.ordered_by}
                  </td>
                  <td className="px-8 py-5">
                     <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter ${
                       order.urgency === 'STAT' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 bg-slate-50'
                     }`}>
                        {order.urgency}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-20 text-center">
               <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Microscope size={40} />
               </div>
               <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Worklist Clear</h4>
               <p className="text-slate-500 mt-2 max-w-xs mx-auto">No pending laboratory orders found for processing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaboratoryList;
