import React, { useEffect, useState, useCallback } from 'react';
import apiClient from '../../api/apiClient';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter,
  Download,
  AlertCircle,
  Loader2,
  X,
  Check
} from 'lucide-react';

interface MetadataField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'status' | 'date' | 'checkbox';
}

interface MetadataCrudProps {
  title: string;
  entityName: string;
  fields: MetadataField[];
  endpoint: string;
}

const MetadataCrud: React.FC<MetadataCrudProps> = ({ 
  title, 
  entityName, 
  fields, 
  endpoint
}) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(endpoint);
      // Backend might return { data: [...] } or just [...]
      setData(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (error) {
      console.error(`Failed to fetch ${entityName}`, error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, entityName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      if (editingItem.id) {
        await apiClient.put(`${endpoint}${editingItem.id}`, editingItem);
      } else {
        await apiClient.post(endpoint, editingItem);
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Failed to save ${entityName}`, error);
      alert('Operation failed. Please check your inputs.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm(`Are you sure you want to delete this ${entityName}?`)) return;
    setIsProcessing(true);
    try {
      await apiClient.delete(`${endpoint}${id}`);
      fetchData();
    } catch (error) {
      console.error(`Failed to delete ${entityName}`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  const openCreateModal = () => {
    const newItem = fields.reduce((acc, field) => ({
      ...acc,
      [field.key]: field.type === 'number' ? 0 : field.type === 'checkbox' ? false : ''
    }), {});
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase font-bold tracking-widest text-[10px]">Master Data Governance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Download size={20} />
          </button>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary-600/20"
          >
            <Plus size={20} />
            <span>Add {entityName}</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={`Quick search ${entityName}s...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-primary-500/10 transition-all dark:text-white outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all border border-slate-100 dark:border-slate-800">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-bold uppercase tracking-widest text-xs">Synchronizing Records...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                  {fields.map((field) => (
                    <th key={field.key} className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                      {field.label}
                    </th>
                  ))}
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredData.length > 0 ? filteredData.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    {fields.map((field) => (
                      <td key={field.key} className="px-8 py-5 text-sm font-bold text-slate-700 dark:text-slate-300">
                        {field.type === 'status' ? (
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            String(item[field.key]).toLowerCase() === 'active' || String(item[field.key]).toLowerCase() === 'verified'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {item[field.key]}
                          </span>
                        ) : field.type === 'checkbox' ? (
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${item[field.key] ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-300'}`}>
                             {item[field.key] ? <Check size={14} strokeWidth={4} /> : <X size={14} strokeWidth={4} />}
                          </div>
                        ) : (
                          item[field.key]
                        )}
                      </td>
                    ))}
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={fields.length + 1} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <AlertCircle size={48} className="mb-4 opacity-10" />
                        <p className="text-xl font-black tracking-tight text-slate-300">No {entityName} Records Found</p>
                        <p className="text-xs font-bold uppercase tracking-widest mt-2">Adjust search or add new entry</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 animate-slideUp overflow-hidden">
             <form onSubmit={handleSave}>
                <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <div>
                      <h3 className="text-2xl font-black tracking-tight">{editingItem.id ? `Edit ${entityName}` : `Add New ${entityName}`}</h3>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mt-1">{title}</p>
                   </div>
                   <button type="button" onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                   {fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">{field.label}</label>
                        {field.type === 'checkbox' ? (
                          <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer group hover:bg-primary-50 transition-colors">
                             <span className="font-bold text-sm">Enable {field.label}</span>
                             <div className="relative">
                               <input 
                                  type="checkbox"
                                  checked={editingItem[field.key]}
                                  onChange={(e) => setEditingItem({ ...editingItem, [field.key]: e.target.checked })}
                                  className="sr-only"
                               />
                               <div className={`w-12 h-6 rounded-full transition-all ${editingItem[field.key] ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${editingItem[field.key] ? 'left-7' : 'left-1'}`}></div>
                               </div>
                             </div>
                          </label>
                        ) : (
                          <input 
                            required
                            type={field.type === 'number' ? 'number' : 'text'}
                            value={editingItem[field.key]}
                            onChange={(e) => setEditingItem({ ...editingItem, [field.key]: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all dark:text-white"
                          />
                        )}
                      </div>
                   ))}
                </div>

                <div className="p-10 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-700 hover:bg-white transition-all">Cancel</button>
                   <button type="submit" disabled={isProcessing} className="flex-2 px-12 py-5 rounded-[1.5rem] bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-600/30 transition-all disabled:opacity-50">
                      {isProcessing ? 'Processing...' : 'Save Record'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetadataCrud;
