import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Building2, Plus, Edit2, Trash2, Loader2, Wrench, X, Check, LayoutGrid } from 'lucide-react';

interface Facility {
  id: number;
  name: string;
  code: string;
  type: string;
  is_active: boolean;
}

const FacilitySetup: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);

  const fetchFacilities = async () => {
    try {
      const response = await apiClient.get('/facilities');
      setFacilities(response.data || []);
    } catch (error) {
      console.error('Failed to fetch facilities', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleOpenCreate = () => {
    setSelectedFacility({ name: '', code: '', type: 'Main Hospital', is_active: true });
    setActiveModal('create');
  };

  const handleOpenEdit = (facility: Facility) => {
    setSelectedFacility({ ...facility });
    setActiveModal('edit');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      if (activeModal === 'create') {
        await apiClient.post('/facilities', selectedFacility);
      } else {
        await apiClient.put(`/facilities/${selectedFacility.id}`, selectedFacility);
      }
      fetchFacilities();
      setActiveModal(null);
    } catch (error) {
      console.error('Save failed', error);
      alert('Operation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this facility?')) return;
    setIsProcessing(true);
    try {
      await apiClient.delete(`/facilities/${id}`);
      fetchFacilities();
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
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Facility Infrastructure</h3>
          <p className="text-slate-500 dark:text-slate-400">Configure your hospital units, clinics, and wards.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} />
          <span>Add Unit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div key={fac.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="flex items-start gap-6">
               <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-primary-600/20">
                  <Building2 size={32} />
               </div>
               <div className="flex-1">
                  <h4 className="text-lg font-black tracking-tight">{fac.name}</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{fac.code} • {fac.type}</p>
                  
                  <div className="mt-4 flex items-center gap-2">
                     <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${fac.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {fac.is_active ? 'Online' : 'Offline'}
                     </span>
                  </div>
               </div>
            </div>

            <div className="mt-8 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                onClick={() => handleOpenEdit(fac)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-primary-600 transition-all"
               >
                 <Edit2 size={18} />
               </button>
               <button 
                onClick={() => handleDelete(fac.id)}
                className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-all"
               >
                 <Trash2 size={18} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {facilities.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center">
           <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Building2 size={40} />
           </div>
           <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">No Units Configured</h4>
           <p className="text-slate-500 mt-2 max-w-xs mx-auto">Map out your hospital facilities to begin managing clinical workflows.</p>
        </div>
      )}

      {/* Facility Modal */}
      {activeModal && selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 animate-slideUp overflow-hidden">
             <form onSubmit={handleSave}>
                <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-600/20">
                         <LayoutGrid size={28} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black tracking-tight">{activeModal === 'create' ? 'Add Unit' : 'Modify Unit'}</h3>
                         <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Facility Management</p>
                      </div>
                   </div>
                   <button type="button" onClick={() => setActiveModal(null)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="p-10 space-y-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Facility Name</label>
                      <input 
                        required
                        placeholder="e.g. Intensive Care Unit"
                        value={selectedFacility.name}
                        onChange={(e) => setSelectedFacility({ ...selectedFacility, name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Code</label>
                      <input 
                        required
                        placeholder="e.g. ICU-01"
                        value={selectedFacility.code}
                        onChange={(e) => setSelectedFacility({ ...selectedFacility, code: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Type</label>
                      <select 
                        value={selectedFacility.type}
                        onChange={(e) => setSelectedFacility({ ...selectedFacility, type: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                      >
                         <option>Main Hospital</option>
                         <option>Clinic</option>
                         <option>Pharmacy</option>
                         <option>Laboratory</option>
                         <option>Radiology</option>
                      </select>
                   </div>
                   <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer group hover:bg-primary-50 transition-colors">
                      <span className="font-bold text-sm">Online & Operational</span>
                      <div className="relative">
                        <input 
                           type="checkbox"
                           checked={selectedFacility.is_active}
                           onChange={(e) => setSelectedFacility({ ...selectedFacility, is_active: e.target.checked })}
                           className="sr-only"
                        />
                        <div className={`w-12 h-6 rounded-full transition-all ${selectedFacility.is_active ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                           <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${selectedFacility.is_active ? 'left-7' : 'left-1'}`}></div>
                        </div>
                      </div>
                   </label>
                </div>

                <div className="p-10 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
                   <button type="button" onClick={() => setActiveModal(null)} className="flex-1 px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-700 hover:bg-white transition-all">Cancel</button>
                   <button type="submit" disabled={isProcessing} className="flex-2 px-12 py-5 rounded-[1.5rem] bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-600/30 transition-all disabled:opacity-50">
                      {isProcessing ? 'Processing...' : 'Save Unit'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilitySetup;
