import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Stethoscope, Plus, Loader2, Clock, FileText, ChevronRight } from 'lucide-react';

const ConsultationList: React.FC = () => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await apiClient.get('/clinical/consultations');
        setConsultations(response.data.results || []);
      } catch (error) {
        console.error('Failed to fetch consultations', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConsultations();
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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Consultations</h3>
          <p className="text-slate-500 dark:text-slate-400">Track and manage active patient consultations and diagnoses.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
          <Plus size={20} />
          <span>New Consultation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {consultations.map((cons) => (
          <div key={cons.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center gap-6 hover:shadow-md transition-all group">
            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl text-primary-600">
              <Stethoscope size={24} />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Patient</span>
                <span className="font-bold text-slate-900 dark:text-white">{cons.patient_name || 'Sarah Jenkins'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Status</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg w-fit mt-1">
                  <Clock size={12} /> {cons.status || 'In Progress'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Doctor</span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dr. Nelson Attah</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Started</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">14 mins ago</span>
              </div>
            </div>
            <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        ))}

        {consultations.length === 0 && (
           <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                 <FileText size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-500">No active consultations at the moment.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationList;
