import React, { useState } from 'react';
import {
  Book,
  Cpu,
  Shield,
  Activity,
  Database,
  Zap,
  Lock,
  Server,
  Cloud,
  Network
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FlowDiagram from '../components/docs/FlowDiagram';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Overview');

  const modules = [
    {
      title: 'Identity Hub',
      icon: Lock,
      color: 'blue',
      description: 'Handles JWT-based multi-tenant authentication, 2FA, and granular RBAC permissions.',
      services: ['authService', 'portalService'],
      endpoints: 42
    },
    {
      title: 'Clinical Core',
      icon: Activity,
      color: 'emerald',
      description: 'The heartbeat of the HMS. Manages patient records (MPI), visits, triage, and consultations.',
      services: ['clinicalService', 'queueService'],
      endpoints: 156
    },
    {
      title: 'Operational Hub',
      icon: Database,
      color: 'amber',
      description: 'Manages the financial and logistical backbone: Billing, Insurance, and Inventory.',
      services: ['operationalService', 'insuranceService', 'inventoryService'],
      endpoints: 210
    },
    {
      title: 'Specialized Suite',
      icon: Cpu,
      color: 'purple',
      description: 'High-complexity medical modules for Radiology, Surgical Theatre, and Procedures.',
      services: ['specializedService', 'pharmacyService'],
      endpoints: 184
    },
    {
      title: 'Governance Layer',
      icon: Shield,
      color: 'rose',
      description: 'Platform-wide oversight, compliance tracking, and SaaS administration (God Mode).',
      services: ['saasService', 'complianceService', 'tenantService'],
      endpoints: 167
    }
  ];


  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans selection:bg-primary-500/30">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/50 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
            <Book className="text-white" size={24} />
          </div>
          <span className="text-xl font-black text-white tracking-tighter">
            CarePoint <span className="text-primary-500">Docs</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</Link>
          <Link to="/login" className="px-5 py-2 bg-white text-black rounded-full font-black text-sm hover:bg-primary-500 hover:text-white transition-all">
            Enter Platform
          </Link>
        </div>
      </header>

      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="w-80 fixed left-0 top-20 bottom-0 border-r border-white/5 bg-black/20 p-8 hidden lg:block overflow-y-auto">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Architecture</p>
              <nav className="space-y-2">
                {['Overview', 'Multi-Tenancy', 'Edge Networking', 'Data Schema'].map(item => (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeSection === item ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Service Modules</p>
              <nav className="space-y-2">
                {modules.map(m => (
                  <button
                    key={m.title}
                    onClick={() => setActiveSection(m.title)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeSection === m.title ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {m.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-80 p-12 lg:p-20">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="mb-20 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Zap size={12} />
                <span>Technical Blueprint v1.0</span>
              </div>
              <h1 className="text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
                Architecting the Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-500">Digital Health.</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                CarePoint HMS is built on a modular micro-service architecture designed for massive scale,
                high availability, and seamless multi-tenant isolation.
              </p>
            </div>

            {/* Visual Connections Chart */}
            <div className="mb-20">
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <Network className="text-primary-500" />
                Operational Data Flow
              </h3>
              <FlowDiagram />
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {modules.map((module) => (
                <div key={module.title} className="p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:border-primary-500/20 transition-all group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-black/50 border border-white/10">
                      <module.icon size={28} className="text-primary-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{module.endpoints} Endpoints</span>
                  </div>
                  <h4 className="text-xl font-black text-white mb-3 tracking-tight">{module.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{module.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.services.map(s => (
                      <span key={s} className="px-3 py-1 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-slate-500">
                        {s}.ts
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Analytical Section: Why CarePoint? */}
            <div className="space-y-12 mb-20">
              <h3 className="text-3xl font-black text-white tracking-tight">System Infrastructure</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 w-fit">
                    <Server size={24} className="text-blue-400" />
                  </div>
                  <h5 className="font-bold text-white uppercase tracking-widest text-xs">Edge Networking</h5>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Localized sync nodes ensure the hospital stays operational even during total internet outages.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 w-fit">
                    <Shield size={24} className="text-emerald-400" />
                  </div>
                  <h5 className="font-bold text-white uppercase tracking-widest text-xs">Zero Trust Auth</h5>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Tenant isolation is enforced at the DB level, with JWT-signed claims for every operation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 w-fit">
                    <Cloud size={24} className="text-purple-400" />
                  </div>
                  <h5 className="font-bold text-white uppercase tracking-widest text-xs">Global Scalability</h5>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Cloud-native design allows for infinite horizontal scaling as your medical network grows.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Book size={18} className="text-white" />
                </div>
                <span className="text-sm font-black text-white uppercase tracking-widest">CarePoint Project Documentation</span>
              </div>
              <div className="flex items-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <a href="#" className="hover:text-primary-500 transition-colors">API Status</a>
                <a href="#" className="hover:text-primary-500 transition-colors">Changelog</a>
                <a href="#" className="hover:text-primary-500 transition-colors">Support</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
