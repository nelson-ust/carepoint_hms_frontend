import { useState } from 'react';
import { 
  BarChart3, 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Bell, 
  Moon, 
  Sun,
  Database,
  Users,
  Stethoscope,
  Building2,
  Lock,
  FileText,
  Activity,
  HeartPulse,
  Syringe,
  Microscope,
  Scissors,
  Receipt,
  UserPlus,
  Calendar,
  Layers,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import SaasOverview from '../components/saas/SaasOverview';
import SaasTenants from '../components/saas/SaasTenants';
import SaasPlans from '../components/saas/SaasPlans';
import MetadataCrud from '../components/saas/MetadataCrud';

function SaasAdminDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('SaaS Management');

  const navigation = [
    {
      section: 'SaaS Management',
      icon: LayoutGrid,
      items: [
        { label: 'Overview', icon: BarChart3 },
        { label: 'Tenants', icon: Globe },
        { label: 'Plans', icon: CreditCard },
        { label: 'Edge Nodes', icon: Database },
        { label: 'Support Access', icon: ShieldCheck },
      ]
    },
    {
      section: 'Clinical Metadata',
      icon: Stethoscope,
      items: [
        { label: 'Roles & RBAC', icon: Lock },
        { label: 'Departments', icon: Layers },
        { label: 'Lab Tests', icon: Microscope },
        { label: 'Radiology Procedures', icon: Activity },
        { label: 'Surgical Catalog', icon: Scissors },
        { label: 'Drug Directory', icon: Syringe },
      ]
    },
    {
      section: 'Facility & Operations',
      icon: Building2,
      items: [
        { label: 'Facilities', icon: Building2 },
        { label: 'Wards & Beds', icon: HeartPulse },
        { label: 'Billable Services', icon: Receipt },
        { label: 'Tax Types', icon: FileText },
      ]
    },
    {
      section: 'Human Resources',
      icon: Users,
      items: [
        { label: 'Staff Management', icon: UserPlus },
        { label: 'Payroll Config', icon: CreditCard },
        { label: 'Leave & Attendance', icon: Calendar },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <SaasOverview />;
      case 'Tenants':
        return <SaasTenants />;
      case 'Plans':
        return <SaasPlans />;
      
      // Metadata CRUDs
      case 'Roles & RBAC':
        return (
          <MetadataCrud 
            title="Roles & Permissions"
            entityName="Role"
            fields={[
              { key: 'name', label: 'Role Name', type: 'text' },
              { key: 'code', label: 'Internal Code', type: 'text' },
              { key: 'permissions', label: 'Perm. Count', type: 'number' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            data={[]}
          />
        );
      
      case 'Departments':
        return (
          <MetadataCrud 
            title="Clinical Departments"
            entityName="Department"
            fields={[
              { key: 'name', label: 'Department Name', type: 'text' },
              { key: 'code', label: 'Code', type: 'text' },
              { key: 'facility', label: 'Primary Facility', type: 'text' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            data={[]}
          />
        );

      case 'Lab Tests':
        return (
          <MetadataCrud 
            title="Laboratory Test Catalog"
            entityName="Test"
            fields={[
              { key: 'name', label: 'Test Name', type: 'text' },
              { key: 'category', label: 'Category', type: 'text' },
              { key: 'price', label: 'Standard Price', type: 'text' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            data={[]}
          />
        );

      case 'Drug Directory':
        return (
          <MetadataCrud 
            title="Drug & Medication Directory"
            entityName="Drug"
            fields={[
              { key: 'name', label: 'Generic Name', type: 'text' },
              { key: 'brand', label: 'Brand Name', type: 'text' },
              { key: 'form', label: 'Formulation', type: 'text' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            data={[]}
          />
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Settings size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-bold">God Mode Interface Ready</p>
            <p>Accessing CRUD for {activeTab}...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 flex flex-col text-slate-400">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary-600 p-2 rounded-lg text-white">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            CarePoint <span className="text-xs font-normal text-primary-400 block -mt-1 uppercase tracking-widest">SaaS Super Admin</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto custom-scrollbar">
          {navigation.map((group) => (
            <div key={group.section} className="space-y-1">
              <button 
                onClick={() => setExpandedSection(expandedSection === group.section ? null : group.section)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <group.icon size={14} />
                  <span>{group.section}</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${expandedSection === group.section ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedSection === group.section && (
                <div className="space-y-1 animate-slideDown">
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveTab(item.label)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        activeTab === item.label
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                          : 'hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold border-2 border-primary-400/20">
              {user?.first_name?.charAt(0) || 'G'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">
                {user ? `${user.first_name} ${user.last_name}` : 'Godwin Mbessey'}
              </p>
              <p className="text-[10px] text-primary-400 font-bold uppercase tracking-widest">Global Master</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 transition-all duration-200 font-bold text-sm"
          >
            <LogOut size={18} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-100 dark:border-amber-800">
               <ShieldCheck size={12} />
               <span>God Mode Active</span>
             </div>
             <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">System Time</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SaasAdminDashboard;
