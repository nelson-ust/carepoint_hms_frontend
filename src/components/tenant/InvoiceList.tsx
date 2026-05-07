import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Receipt, Plus, Search, Download, Loader2, User, CreditCard, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Invoice {
  id: number;
  invoice_no: string;
  patient_name: string;
  total_amount: string;
  amount_paid: string;
  balance_due: string;
  status: string;
  invoice_date: string;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInvoices = async () => {
    try {
      const response = await apiClient.get('/invoices/');
      setInvoices(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-emerald-100 text-emerald-600';
      case 'partial': return 'bg-amber-100 text-amber-600';
      case 'unpaid': return 'bg-red-100 text-red-600';
      case 'void': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const filteredInvoices = invoices.filter(i => 
    i.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Revenue & Billing</h3>
          <p className="text-slate-500 dark:text-slate-400">Track hospital earnings, patient invoices, and payment statuses.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold transition-all">
             <Download size={20} />
             <span>Export</span>
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
             <Plus size={20} />
             <span>Create Invoice</span>
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
           <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by invoice # or patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Invoice / Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Patient</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Total Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Balance</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">{inv.invoice_no}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{new Date(inv.invoice_date).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <span className="font-bold text-slate-700 dark:text-slate-300">{inv.patient_name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-slate-900 dark:text-white">₦{parseFloat(inv.total_amount).toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`font-black ${parseFloat(inv.balance_due) > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                       ₦{parseFloat(inv.balance_due).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                     <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(inv.status)}`}>
                        {inv.status}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-primary-600 transition-all">
                       <CreditCard size={18} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {invoices.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center">
           <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Receipt size={40} />
           </div>
           <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">No Invoices Found</h4>
           <p className="text-slate-500 mt-2 max-w-xs mx-auto">Your billing history is currently empty. Generate invoices for patient consultations to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
