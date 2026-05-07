import { 
  Globe, 
  CreditCard, 
  BarChart3, 
  Database,
  ArrowUpRight
} from 'lucide-react';

const SaasOverview = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Tenants', value: '142', trend: '+8', icon: Globe, color: 'bg-blue-500' },
          { label: 'Active Subscriptions', value: '128', trend: '+12%', icon: CreditCard, color: 'bg-purple-500' },
          { label: 'Total MRR', value: '$42,500', trend: '+$2.4k', icon: BarChart3, color: 'bg-emerald-500' },
          { label: 'Edge Nodes Online', value: '38/42', trend: '4 offline', icon: Database, color: 'bg-amber-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg shadow-opacity-20`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.trend}</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Onboarding Applications</h3>
            <button className="text-primary-600 text-sm font-semibold hover:underline">Process All</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { name: 'City General Hospital', code: 'CITYGEN', plan: 'Enterprise', status: 'Pending Approval' },
              { name: 'Grace Medical Center', code: 'GRACEMED', plan: 'Professional', status: 'Pending Approval' },
              { name: 'Northside Clinic', code: 'NORTHCL', plan: 'Basic', status: 'In Review' },
            ].map((tenant) => (
              <div key={tenant.code} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{tenant.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tenant.code} • {tenant.plan} Plan</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold px-2 py-1 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    {tenant.status}
                  </span>
                  <ArrowUpRight size={18} className="text-slate-400 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Analytics */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Platform Usage (24h)</h3>
          <div className="space-y-6">
            {[
              { label: 'API Requests', value: '1.2M', progress: 75, color: 'bg-blue-500' },
              { label: 'Storage (S3)', value: '4.2 TB', progress: 45, color: 'bg-purple-500' },
              { label: 'SMS Sent', value: '84,200', progress: 90, color: 'bg-emerald-500' },
              { label: 'Email Dispatch', value: '142,000', progress: 60, color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
                  <span className="text-slate-900 dark:text-white font-bold">{item.value}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaasOverview;
