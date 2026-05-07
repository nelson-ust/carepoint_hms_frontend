import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Stethoscope
} from 'lucide-react';

const TenantOverview = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Patients', value: '1,284', trend: '+12%', icon: Users, color: 'bg-blue-500' },
          { label: 'Today Appointments', value: '24', trend: '+4', icon: Calendar, color: 'bg-purple-500' },
          { label: 'Surgery Pending', value: '8', trend: '-2', icon: Stethoscope, color: 'bg-emerald-500' },
          { label: 'New Reports', value: '42', trend: '+18', icon: ClipboardList, color: 'bg-amber-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg shadow-opacity-20`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white">Upcoming Appointments</h3>
            <button className="text-primary-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { name: 'Sarah Jenkins', time: '09:00 AM', type: 'Checkup', status: 'Confirmed' },
                  { name: 'Michael Chen', time: '10:30 AM', type: 'Follow-up', status: 'Pending' },
                  { name: 'Emma Wilson', time: '11:45 AM', type: 'Emergency', status: 'In Progress' },
                  { name: 'Robert Brown', time: '02:15 PM', type: 'Vaccination', status: 'Confirmed' },
                ].map((appt) => (
                  <tr key={appt.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-white">{appt.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{appt.time}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{appt.type}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        appt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        appt.status === 'Pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { title: 'New Lab Report', time: '2 mins ago', desc: 'Blood test results for Patient #2841', icon: ClipboardList, color: 'text-blue-500' },
              { title: 'Appointment Cancelled', time: '1 hour ago', desc: 'Alice Cooper cancelled for tomorrow', icon: Calendar, color: 'text-red-500' },
              { title: 'Prescription Issued', time: '3 hours ago', desc: 'Amoxicillin prescribed to Michael Chen', icon: Stethoscope, color: 'text-purple-500' },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`mt-1 ${activity.color}`}>
                  <activity.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{activity.time}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantOverview;
