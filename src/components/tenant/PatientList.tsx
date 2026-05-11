import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Plus, Search, Edit2, Loader2, User, Phone, Mail, X } from 'lucide-react';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  hospital_number: string;
  email: string;
  phone_number: string;
  gender: string;
  date_of_birth: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const fetchPatients = async () => {
    try {
      const response = await apiClient.get('/patients/');
      setPatients(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch patients', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleOpenCreate = () => {
    setSelectedPatient({
      first_name: '',
      last_name: '',
      middle_name: '',
      email: '',
      phone_number: '',
      gender: 'Male',
      date_of_birth: '1990-01-01'
    });
    setActiveModal('create');
  };

  const handleOpenEdit = (patient: Patient) => {
    setSelectedPatient({ ...patient });
    setActiveModal('edit');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      if (activeModal === 'create') {
        await apiClient.post('/patients/', selectedPatient);
      } else {
        await apiClient.put(`/patients/${selectedPatient.id}`, selectedPatient);
      }
      fetchPatients();
      setActiveModal(null);
    } catch (error) {
      console.error('Save failed', error);
      alert('Operation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.hospital_number.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Patient Registry</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage patient records and medical histories.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-navy-900/20"
        >
          <Plus size={20} />
          <span>Register Patient</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or MRN..."
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Patient Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-navy-600 font-black">
                        {patient.first_name.charAt(0)}{patient.last_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">{patient.first_name} {patient.last_name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{patient.gender} • {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} yrs</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                        <Phone size={12} className="text-slate-400" />
                        <span>{patient.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                        <Mail size={12} className="text-slate-400" />
                        <span>{patient.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                     <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary-100 dark:border-primary-800">
                        {patient.hospital_number}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <button 
                      onClick={() => handleOpenEdit(patient)}
                      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-navy-600 transition-all opacity-0 group-hover:opacity-100"
                     >
                       <Edit2 size={18} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Modal */}
      {activeModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-slideUp overflow-hidden">
             <form onSubmit={handleSave}>
                <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-navy-900/20">
                         <User size={28} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black tracking-tight">{activeModal === 'create' ? 'Register Patient' : 'Modify Record'}</h3>
                         <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Medical Registry</p>
                      </div>
                   </div>
                   <button type="button" onClick={() => setActiveModal(null)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="p-10 grid grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                   <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">First Name</label>
                        <input 
                          required
                          value={selectedPatient.first_name}
                          onChange={(e) => setSelectedPatient({ ...selectedPatient, first_name: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Last Name</label>
                        <input 
                          required
                          value={selectedPatient.last_name}
                          onChange={(e) => setSelectedPatient({ ...selectedPatient, last_name: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Gender</label>
                        <select 
                          value={selectedPatient.gender}
                          onChange={(e) => setSelectedPatient({ ...selectedPatient, gender: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                        >
                           <option>Male</option>
                           <option>Female</option>
                           <option>Other</option>
                        </select>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Date of Birth</label>
                        <input 
                          required
                          type="date"
                          value={selectedPatient.date_of_birth}
                          onChange={(e) => setSelectedPatient({ ...selectedPatient, date_of_birth: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Phone Number</label>
                        <input 
                          required
                          value={selectedPatient.phone_number}
                          onChange={(e) => setSelectedPatient({ ...selectedPatient, phone_number: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Email Address</label>
                        <input 
                          type="email"
                          value={selectedPatient.email}
                          onChange={(e) => setSelectedPatient({ ...selectedPatient, email: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                        />
                      </div>
                   </div>
                </div>

                <div className="p-10 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
                   <button type="button" onClick={() => setActiveModal(null)} className="flex-1 px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-700 hover:bg-white transition-all">Cancel</button>
                   <button type="submit" disabled={isProcessing} className="flex-2 px-12 py-5 rounded-[1.5rem] bg-navy-900 hover:bg-navy-800 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-navy-900/30 transition-all disabled:opacity-50">
                      {isProcessing ? 'Processing...' : 'Secure Record'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
