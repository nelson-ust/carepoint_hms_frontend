import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { CreditCard, Plus, Search, Filter, Loader2, User, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await apiClient.get('/finance/invoices');
        setInvoices(response.data.results || []);
      } catch (error) {
        console.error('Failed to fetch invoices', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Invoices</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage patient billing, payments, and insurance claims.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
            <Plus size={20} />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/20">
            <p className="text-emerald-600 font-bold text-sm mb-1">Paid Today</p>
            <h4 className="text-3xl font-black text-emerald-700 dark:text-emerald-400">$12,450.00</h4>
         </div>
         <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/20">
            <p className="text-amber-600 font-bold text-sm mb-1">Pending Invoices</p>
            <h4 className="text-3xl font-black text-amber-700 dark:text-amber-400">42</h4>
         </div>
         <div className="bg-primary-50 dark:bg-primary-900/10 p-6 rounded-3xl border border-primary-100 dark:border-primary-900/20">
            <p className="text-primary-600 font-bold text-sm mb-1">Insurance Pending</p>
            <h4 className="text-3xl font-black text-primary-700 dark:text-primary-400">$8,200.00</h4>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <th className="px-6 py-4">Invoice / Patient</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">INV-{inv.invoice_number || '84920'}</span>
                    <span className="text-xs text-slate-500">{inv.patient_name || 'Michael Chen'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                  ${inv.total_amount || '245.00'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {inv.due_date || 'May 12, 2024'}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    inv.status === 'paid' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                    'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                  }`}>
                    {(inv.status || 'pending').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                      <Download size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                      <FileText size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <CreditCard size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No invoices generated yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
