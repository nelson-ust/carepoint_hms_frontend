import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  Moon, 
  Sun, 
  Search, 
  Bell, 
  UserCircle,
  Stethoscope,
  Activity,
  Plus,
  LogOut,
  Building2,
  CreditCard
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import TenantOverview from '../components/tenant/TenantOverview';
import TenantSettings from '../components/tenant/TenantSettings';
import UserManagement from '../components/tenant/UserManagement';
import FacilitySetup from '../components/tenant/FacilitySetup';
import PatientList from '../components/tenant/PatientList';
import ConsultationList from '../components/tenant/ConsultationList';
import InvoiceList from '../components/tenant/InvoiceList';

function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Building2, label: 'Facilities' },
    { icon: Users, label: 'Patients' },
    { icon: Activity, label: 'Staff' },
    { icon: Calendar, label: 'Appointments' },
    { icon: Stethoscope, label: 'Consultations' },
    { icon: CreditCard, label: 'Billing' },
    { icon: Settings, label: 'Settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <TenantOverview />;
      case 'Settings':
        return <TenantSettings />;
      case 'Staff':
        return <UserManagement />;
      case 'Facilities':
        return <FacilitySetup />;
      case 'Patients':
        return <PatientList />;
      case 'Consultations':
        return <ConsultationList />;
      case 'Billing':
        return <InvoiceList />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4">
              <Activity size={40} className="opacity-20" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Module Initializing</h3>
            <p>The {activeTab} module is coming in the next phase.</p>
          </div>
        );
    }
  };

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

        <div className="p-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <UserCircle size={40} className="text-slate-400" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                {user ? `${user.first_name} ${user.last_name}` : 'Dr. Nelson Attah'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user?.is_superuser ? 'Administrator' : 'Staff'}
              </p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
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
              <span>{activeTab === 'Patients' ? 'Add Patient' : 'New Record'}</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
