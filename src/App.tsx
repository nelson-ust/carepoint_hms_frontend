import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings, 
  Moon, 
  Sun, 
  Search, 
  Bell, 
  UserCircle,
  Stethoscope,
  Activity,
  Plus
} from 'lucide-react';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Users, label: 'Patients' },
    { icon: Calendar, label: 'Appointments' },
    { icon: ClipboardList, label: 'Records' },
    { icon: Stethoscope, label: 'Consultations' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary-600 p-2 rounded-lg text-white">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">CarePoint</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.label
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <UserCircle size={40} className="text-slate-400" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">Dr. Nelson Attah</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search patients, records..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-primary-600/20">
              <Plus size={20} />
              <span>New Patient</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Dr. Nelson</h2>
                <p className="text-slate-500 dark:text-slate-400">Here's what's happening in your clinic today.</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">{appt.name}</p>
                          </td>
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
        </div>
      </main>
    </div>
  );
}

export default App;
