import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Search, Plus, Loader2, User, Phone, Calendar, ArrowRight } from 'lucide-react';

interface Patient {
  id: number;
  mpi_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiClient.get('/patients');
        setPatients(response.data.results || []);
      } catch (error) {
        console.error('Failed to fetch patients', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    p.mpi_number.toLowerCase().includes(search.toLowerCase())
  );

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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Master Patient Index</h3>
          <p className="text-slate-500 dark:text-slate-400">Search and manage central patient records.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or MPI..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm w-80 outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
            <Plus size={20} />
            <span>New Patient</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <th className="px-6 py-4">Patient Profile</th>
              <th className="px-6 py-4">MPI Number</th>
              <th className="px-6 py-4">Gender / Age</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{patient.first_name} {patient.last_name}</p>
                      <p className="text-xs text-slate-500">Registered on {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs font-bold text-slate-600 dark:text-slate-400">
                  {patient.mpi_number}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">{patient.gender}</span>
                    <span className="text-xs text-slate-500">24 Years</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone size={12} />
                      <span>{patient.phone_number}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-primary-600" title="Book Appointment">
                      <Calendar size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                         <User size={40} className="text-slate-300" />
                      </div>
                      <div>
                        <p className="text-slate-500 font-medium">No patient records found.</p>
                        <button className="text-primary-600 text-sm font-bold mt-2 hover:underline">Register your first patient</button>
                      </div>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
