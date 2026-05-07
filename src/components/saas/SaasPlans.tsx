import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Plus, Edit2, Trash2, Check, X, Loader2, CreditCard, Layers } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  code: string;
  description: string;
  price: string;
  currency: string;
  interval: string;
  max_facilities: number;
  max_users: number;
  max_patients: number;
  has_clinical: boolean;
  has_inpatient: boolean;
  has_laboratory: boolean;
  has_pharmacy: boolean;
  has_inventory: boolean;
  has_billing: boolean;
  has_reporting: boolean;
  is_active: boolean;
}

const SaasPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const fetchPlans = async () => {
    try {
      const response = await apiClient.get('/saas/plans');
      setPlans(response.data || []);
    } catch (error) {
      console.error('Failed to fetch plans', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenCreate = () => {
    setSelectedPlan({
      name: '',
      code: '',
      description: '',
      price: '0.00',
      currency: 'NGN',
      interval: 'MONTHLY',
      max_facilities: 1,
      max_users: 10,
      max_patients: 0,
      has_clinical: true,
      has_inpatient: false,
      has_laboratory: false,
      has_pharmacy: false,
      has_inventory: false,
      has_billing: true,
      has_reporting: false,
      is_active: true
    });
    setActiveModal('create');
  };

  const handleOpenEdit = (plan: Plan) => {
    setSelectedPlan({ ...plan });
    setActiveModal('edit');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const payload = {
      ...selectedPlan,
      price: parseFloat(selectedPlan.price),
      interval: (selectedPlan.interval || 'MONTHLY').toUpperCase()
    };

    try {
      if (activeModal === 'create') {
        await apiClient.post('/saas/plans', payload);
      } else {
        await apiClient.put(`/saas/plans/${selectedPlan.id}`, payload);
      }
      fetchPlans();
      setActiveModal(null);
    } catch (error) {
      console.error('Save failed', error);
      alert('Operation failed. Please check your inputs.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this plan?')) return;
    setIsProcessing(true);
    try {
      await apiClient.delete(`/saas/plans/${id}`);
      fetchPlans();
    } catch (error) {
      console.error('Delete failed', error);
    } finally {
      setIsProcessing(false);
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
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Subscription Plans</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage available billing plans and their features.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} />
          <span>Create Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:border-primary-500/30 transition-all">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${plan.is_active ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-slate-100 text-slate-500'}`}>
                  {plan.is_active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenEdit(plan)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(plan.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{plan.name}</h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{plan.code}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.currency} {plan.price}</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">/ {plan.interval || 'Month'}</span>
              </div>
            </div>

            <div className="p-6 flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Facilities</span>
                  <span className="font-black text-slate-900 dark:text-white">{plan.max_facilities}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Concurrent Users</span>
                  <span className="font-black text-slate-900 dark:text-white">{plan.max_users}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {[
                  { label: 'Clinical', active: plan.has_clinical },
                  { label: 'Laboratory', active: plan.has_laboratory },
                  { label: 'Pharmacy', active: plan.has_pharmacy },
                  { label: 'Billing', active: plan.has_billing },
                ].map((feat) => (
                  <div key={feat.label} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feat.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'}`}>
                       {feat.active ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
                    </div>
                    <span className={`font-bold ${feat.active ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 opacity-50'}`}>
                      {feat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <div className="col-span-full bg-slate-50 dark:bg-slate-800/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center">
            <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-300">
               <CreditCard size={40} />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">No Tiers Defined</h4>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">Establish your first subscription tier to begin commercializing the platform.</p>
          </div>
        )}
      </div>

      {/* Plan Modal */}
      {activeModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-slideUp overflow-hidden">
             <form onSubmit={handleSave}>
                <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-600/20">
                         <Layers size={28} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black tracking-tight">{activeModal === 'create' ? 'Define New Tier' : 'Modify Tier'}</h3>
                         <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Subscription Governance</p>
                      </div>
                   </div>
                   <button type="button" onClick={() => setActiveModal(null)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="p-10 grid grid-cols-2 gap-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-2">Core Parameters</h4>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Plan Name</label>
                        <input 
                          required
                          placeholder="e.g. Enterprise Elite"
                          value={selectedPlan.name}
                          onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Plan Code</label>
                        <input 
                          required
                          placeholder="e.g. tier-elite"
                          value={selectedPlan.code}
                          onChange={(e) => setSelectedPlan({ ...selectedPlan, code: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Price</label>
                          <input 
                            required
                            placeholder="0.00"
                            value={selectedPlan.price}
                            onChange={(e) => setSelectedPlan({ ...selectedPlan, price: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Interval</label>
                          <select 
                            value={selectedPlan.interval}
                            onChange={(e) => setSelectedPlan({ ...selectedPlan, interval: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all"
                          >
                             <option value="MONTHLY">Monthly</option>
                             <option value="YEARLY">Yearly</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 ml-1">Max Facilities</label>
                            <input type="number" value={selectedPlan.max_facilities} onChange={(e) => setSelectedPlan({ ...selectedPlan, max_facilities: parseInt(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all" />
                         </div>
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 ml-1">Max Users</label>
                            <input type="number" value={selectedPlan.max_users} onChange={(e) => setSelectedPlan({ ...selectedPlan, max_users: parseInt(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-2">Feature Authorization</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: 'has_clinical', label: 'Clinical' },
                          { key: 'has_inpatient', label: 'Inpatient' },
                          { key: 'has_laboratory', label: 'Laboratory' },
                          { key: 'has_pharmacy', label: 'Pharmacy' },
                          { key: 'has_inventory', label: 'Inventory' },
                          { key: 'has_billing', label: 'Billing' },
                          { key: 'has_reporting', label: 'Reporting' },
                          { key: 'is_active', label: 'Is Active' },
                        ].map((feat) => (
                          <label key={feat.key} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer group hover:bg-primary-50 transition-colors">
                             <span className="font-bold text-xs">{feat.label}</span>
                             <div className="relative">
                               <input 
                                  type="checkbox"
                                  checked={selectedPlan[feat.key]}
                                  onChange={(e) => setSelectedPlan({ ...selectedPlan, [feat.key]: e.target.checked })}
                                  className="sr-only"
                               />
                               <div className={`w-10 h-5 rounded-full transition-all ${selectedPlan[feat.key] ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${selectedPlan[feat.key] ? 'left-5.5' : 'left-0.5'}`}></div>
                                </div>
                             </div>
                          </label>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="p-10 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
                   <button type="button" onClick={() => setActiveModal(null)} className="flex-1 px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-700 hover:bg-white transition-all">Cancel</button>
                   <button type="submit" disabled={isProcessing} className="flex-2 px-12 py-5 rounded-[1.5rem] bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-600/30 transition-all disabled:opacity-50">
                      {isProcessing ? 'Processing...' : 'Commit Configuration'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaasPlans;
