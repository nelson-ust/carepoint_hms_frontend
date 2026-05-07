import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Building2, Plus, LayoutGrid, Bed, Users, MapPin, Loader2, ArrowRight } from 'lucide-react';

const FacilitySetup: React.FC = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await apiClient.get('/organisation/facilities');
        setFacilities(response.data);
      } catch (error) {
        console.error('Failed to fetch facilities', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Facility Structure</h3>
          <p className="text-slate-500 dark:text-slate-400">Define your hospital buildings, departments, and wards.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
          <Plus size={20} />
          <span>Add Facility</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl text-primary-600">
                  <Building2 size={32} />
                </div>
                <button className="text-primary-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Manage Structure <ArrowRight size={16} />
                </button>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{facility.name}</h4>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <MapPin size={14} />
                <span>{facility.address || 'Main Campus'}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
                  <LayoutGrid size={20} className="mx-auto text-primary-500 mb-1" />
                  <p className="text-xs text-slate-500 font-medium">Departments</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{facility.departments_count || 12}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
                  <Bed size={20} className="mx-auto text-emerald-500 mb-1" />
                  <p className="text-xs text-slate-500 font-medium">Wards</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{facility.wards_count || 8}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
                  <Users size={20} className="mx-auto text-amber-500 mb-1" />
                  <p className="text-xs text-slate-500 font-medium">Staff</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{facility.staff_count || 45}</p>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-4 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">DR</div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-primary-600 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
               </div>
               <span className="text-xs font-bold text-slate-400">Last updated 2 hours ago</span>
            </div>
          </div>
        ))}

        {facilities.length === 0 && (
          <div className="col-span-full py-12 text-center bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
             <Building2 size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="text-slate-500">No facilities configured yet. Add your first building to start.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitySetup;
