import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Settings, Image as ImageIcon, Save, Loader2, Mail, CreditCard, Database } from 'lucide-react';

const TenantSettings: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('General');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    primary_color: '#0ea5e9',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    date_format: 'DD/MM/YYYY'
  });

  const fetchSettings = async () => {
    try {
      const response = await apiClient.get('/settings');
      if (response.data) {
        setSettings(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      console.error('Failed to fetch settings', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.put('/settings', settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Save failed', error);
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const subTabs = [
    { label: 'General', icon: Settings },
    { label: 'Email', icon: Mail },
    { label: 'Payments', icon: CreditCard },
    { label: 'Backups', icon: Database },
  ];

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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Hospital Configuration</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage your branding, communications, and system settings.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-[1.25rem] font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary-600/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          <span>{isSaving ? 'Saving...' : 'Commit Changes'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sub-navigation */}
        <aside className="w-full lg:w-64 space-y-2">
          {subTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveSubTab(tab.label)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${
                activeSubTab === tab.label
                  ? 'bg-white dark:bg-slate-900 text-primary-600 shadow-xl border border-slate-100 dark:border-slate-800'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} />
                <span className="text-sm">{tab.label}</span>
              </div>
              {activeSubTab === tab.label && <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>}
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-10">
          {activeSubTab === 'General' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Branding & Identity</h4>
                   <div className="flex items-start gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Hospital Logo</label>
                        <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-primary-500 hover:text-primary-500 transition-all">
                          <ImageIcon size={24} className="mb-1" />
                          <span className="text-[10px] font-bold">Replace</span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Brand Color</label>
                          <div className="flex gap-2">
                            <input 
                              type="color" 
                              value={settings.primary_color} 
                              onChange={e => setSettings({...settings, primary_color: e.target.value})}
                              className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-none" 
                            />
                            <input 
                              type="text" 
                              value={settings.primary_color} 
                              onChange={e => setSettings({...settings, primary_color: e.target.value})}
                              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 font-bold text-sm outline-none focus:ring-4 focus:ring-primary-500/10 dark:text-white" 
                            />
                          </div>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Localization</h4>
                   <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reporting Currency</label>
                        <select 
                          value={settings.currency}
                          onChange={e => setSettings({...settings, currency: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold text-sm outline-none focus:ring-4 focus:ring-primary-500/10 dark:text-white"
                        >
                          <option value="USD">United States Dollar ($)</option>
                          <option value="NGN">Nigerian Naira (₦)</option>
                          <option value="GBP">British Pound (£)</option>
                          <option value="EUR">Euro (€)</option>
                        </select>
                      </div>
                   </div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Regional Timezone</label>
                    <select 
                      value={settings.timezone}
                      onChange={e => setSettings({...settings, timezone: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold text-sm outline-none focus:ring-4 focus:ring-primary-500/10 dark:text-white"
                    >
                      <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                      <option value="UTC">Universal Time Coordinated (UTC)</option>
                      <option value="Europe/London">Europe/London (GMT+0)</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">System Date Format</label>
                    <select 
                      value={settings.date_format}
                      onChange={e => setSettings({...settings, date_format: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold text-sm outline-none focus:ring-4 focus:ring-primary-500/10 dark:text-white"
                    >
                      <option value="DD/MM/YYYY">Day/Month/Year (31/12/2025)</option>
                      <option value="MM/DD/YYYY">Month/Day/Year (12/31/2025)</option>
                      <option value="YYYY-MM-DD">ISO Format (2025-12-31)</option>
                    </select>
                 </div>
              </div>
            </div>
          )}

          {activeSubTab !== 'General' && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-xl shadow-slate-100 dark:shadow-none">
                <Settings size={40} className="opacity-20" />
              </div>
              <h4 className="text-xl font-black tracking-tight text-slate-800 dark:text-white mb-2">{activeSubTab} Configuration</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-[10px]">Coming in the next infrastructure update</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantSettings;
