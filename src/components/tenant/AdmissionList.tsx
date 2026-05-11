import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Bed, Plus, Search, Loader2, User, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface Admission {
  id: number;
  admission_no: string;
  patient_name: string;
  ward_name: string;
  bed_number: string;
  admission_date: string;
  status: 'ADMITTED' | 'DISCHARGED' | 'TRANSFER_PENDING';
}

const AdmissionList: React.FC = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdmissions = async () => {
    try {
      // Endpoint from integration guide: GET /admissions/
      const response = await apiClient.get('/admissions/');
      setAdmissions(Array.isArray(response.data) ? response.data : response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch admissions', error);
      setAdmissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">In-Patient Admissions</h3>
          <p className="text-slate-500 dark:text-slate-400">Track active admissions, ward occupancy, and discharge planning.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-navy-900/20">
          <Plus size={20} />
          <span>New Admission</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by patient name or admission ID..."
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Admission Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Ward & Bed</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Admitted Since</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {admissions.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-navy-600 font-black">
                        <Bed size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">{adm.patient_name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{adm.admission_no}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{adm.ward_name} • Bed {adm.bed_number}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600 dark:text-slate-400">
                     {new Date(adm.admission_date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      adm.status === 'ADMITTED' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {adm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {admissions.length === 0 && (
            <div className="p-20 text-center">
               <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Bed size={40} />
               </div>
               <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">No Active Admissions</h4>
               <p className="text-slate-500 mt-2 max-w-xs mx-auto">The hospital wards are currently at zero occupancy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionList;
