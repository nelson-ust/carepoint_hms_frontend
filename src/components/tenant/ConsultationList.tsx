import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Stethoscope, Plus, Search, Edit2, Loader2, User, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface Consultation {
  id: number;
  patient_name: string;
  doctor_name: string;
  consultation_date: string;
  status: string;
  symptoms: string;
  diagnosis: string;
}

const ConsultationList: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchConsultations = async () => {
    try {
      const response = await apiClient.get('/consultations/');
      setConsultations(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch consultations', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const filteredConsultations = consultations.filter(c => 
    c.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Clinical Consultations</h3>
          <p className="text-slate-500 dark:text-slate-400">Track patient visits, diagnoses, and treatment plans.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
          <Plus size={20} />
          <span>New Consultation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredConsultations.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between group hover:border-primary-500/30 transition-all">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary-600 transition-colors">
                  <Stethoscope size={28} />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                    {c.patient_name}
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg uppercase tracking-widest ${c.status === 'finalized' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {c.status}
                    </span>
                  </h4>
                  <p className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-1">
                    <User size={12} /> {c.doctor_name} • <Clock size={12} /> {new Date(c.consultation_date).toLocaleDateString()}
                  </p>
               </div>
            </div>
            
            <div className="flex items-center gap-8 text-right">
               <div className="hidden md:block">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Presumptive Diagnosis</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{c.diagnosis || 'Pending'}</p>
               </div>
               <button className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-primary-600 transition-all">
                  <FileText size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {consultations.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center">
           <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Stethoscope size={40} />
           </div>
           <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Clinical Log Empty</h4>
           <p className="text-slate-500 mt-2 max-w-xs mx-auto">No consultations have been recorded today. Select a patient to begin a clinical session.</p>
        </div>
      )}
    </div>
  );
};

export default ConsultationList;
