import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Settings, Image as ImageIcon, Save, Loader2, Mail, CreditCard, Database } from 'lucide-react';

const TenantSettings: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('General');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        await apiClient.get('/settings');
        // Data could be used here in the future
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hospital Configuration</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage your branding, communications, and system settings.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sub-navigation */}
        <aside className="w-48 space-y-1">
          {subTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveSubTab(tab.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeSubTab === tab.label
                  ? 'bg-white dark:bg-slate-900 text-primary-600 shadow-sm border border-slate-100 dark:border-slate-800'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          {activeSubTab === 'General' && (
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Branding & Identity</h4>
                <div className="flex items-start gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hospital Logo</label>
                    <div className="w-32 h-32 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-primary-500 hover:text-primary-500 transition-all">
                      <ImageIcon size={32} className="mb-2" />
                      <span className="text-xs">Upload</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Primary Color</label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#0ea5e9" className="w-12 h-10 rounded-lg cursor-pointer" />
                        <input type="text" defaultValue="#0ea5e9" className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Default Currency</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-primary-500 dark:text-white">
                        <option>USD ($)</option>
                        <option>NGN (₦)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Regional & Localization</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Timezone</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-primary-500 dark:text-white">
                      <option>Africa/Lagos (GMT+1)</option>
                      <option>UTC (GMT+0)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date Format</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-primary-500 dark:text-white">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab !== 'General' && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Settings size={32} className="opacity-20" />
              </div>
              <p>The {activeSubTab} configuration module is being initialized.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantSettings;
