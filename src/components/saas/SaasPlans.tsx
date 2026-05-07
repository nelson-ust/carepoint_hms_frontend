import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Plus, Edit2, Trash2, Check, X, Loader2 } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  code: string;
  price: string;
  currency: string;
  max_facilities: number;
  max_users: number;
  has_clinical: boolean;
  has_laboratory: boolean;
  has_pharmacy: boolean;
  is_active: boolean;
}

const SaasPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiClient.get('/saas/plans');
        setPlans(response.data);
      } catch (error) {
        console.error('Failed to fetch plans', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Subscription Plans</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage available billing plans and their features.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-primary-600/20">
          <Plus size={20} />
          <span>Create Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${plan.is_active ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-slate-100 text-slate-500'}`}>
                  {plan.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><Edit2 size={16} /></button>
                  <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h4>
              <p className="text-slate-500 text-sm">{plan.code}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.currency} {plan.price}</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Max Facilities</span>
                  <span className="font-bold text-slate-900 dark:text-white">{plan.max_facilities}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Max Users</span>
                  <span className="font-bold text-slate-900 dark:text-white">{plan.max_users}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {[
                  { label: 'Clinical Module', active: plan.has_clinical },
                  { label: 'Laboratory', active: plan.has_laboratory },
                  { label: 'Pharmacy', active: plan.has_pharmacy },
                ].map((feat) => (
                  <div key={feat.label} className="flex items-center gap-2 text-sm">
                    {feat.active ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <X size={16} className="text-slate-300" />
                    )}
                    <span className={feat.active ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 line-through'}>
                      {feat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* Placeholder if empty */}
        {plans.length === 0 && (
          <div className="col-span-full bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
            <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No plans found. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaasPlans;
