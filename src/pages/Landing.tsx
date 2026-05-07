import React from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Users,
  Stethoscope,
  ShieldCheck,
  BarChart3,
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg text-white">
              <Activity size={24} />
            </div>
            <span className="text-xl font-black tracking-tight">CarePoint</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="font-bold text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Sign In</Link>
            <Link to="/docs" className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
              Docs
            </Link>
            <Link to="/register" className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeInLeft">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-xs font-bold mb-6">
              <Zap size={14} />
              <span>THE FUTURE OF HEALTHCARE MANAGEMENT</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
              Hospital Management <span className="text-primary-600">Reimagined.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
              CarePoint is a state-of-the-art multi-tenant SaaS platform designed to streamline every aspect of clinical and operational hospital workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary-600/20">
                Register Your Hospital <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl font-bold text-lg transition-all">
                Login to Portal
              </Link>
            </div>
          </div>
          <div className="relative animate-fadeInRight">
            <img
              src="/assets/hero.png"
              alt="Modern Hospital Interface"
              className="rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-slate-800"
            />
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">System Status</p>
                  <p className="text-lg font-black">99.9% Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Everything You Need to Scale</h2>
          <p className="text-slate-500 dark:text-slate-400">Modular features built for modern healthcare institutions.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Clinical Workflows', icon: Stethoscope, desc: 'Advanced MPI, consultations, and laboratory integration.', img: '/assets/clinical.png' },
            { title: 'Operations Hub', icon: BarChart3, iconColor: 'text-purple-500', desc: 'Real-time analytics, facility mapping, and bed management.', img: '/assets/analytics.png' },
            { title: 'Financial Engine', icon: ShieldCheck, iconColor: 'text-emerald-500', desc: 'Automated billing, insurance claims, and payroll systems.', img: '/assets/lab.png' },
            { title: 'Global SaaS Control', icon: Globe, iconColor: 'text-primary-500', desc: 'Multi-tenant infrastructure with edge node monitoring.', img: '/assets/hero.png' }
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-slate-950 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <img src={feature.img} alt={feature.title} className="w-full h-40 object-cover rounded-2xl mb-6" />
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-900 ${feature.iconColor || 'text-primary-600'}`}>
                  <feature.icon size={20} />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role Explanation */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                    <ShieldCheck className="text-primary-600 mb-3" size={32} />
                    <h4 className="font-bold">SaaS Admin</h4>
                    <p className="text-xs text-slate-500 mt-1">Platform management, billing, and global oversight.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                    <Stethoscope className="text-emerald-500 mb-3" size={32} />
                    <h4 className="font-bold">Clinical Staff</h4>
                    <p className="text-xs text-slate-500 mt-1">Doctors and nurses managing consultations and care.</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                    <Users className="text-amber-500 mb-3" size={32} />
                    <h4 className="font-bold">Tenant Admin</h4>
                    <p className="text-xs text-slate-500 mt-1">Hospital owners managing staff and configurations.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                    <Activity className="text-purple-500 mb-3" size={32} />
                    <h4 className="font-bold">Patient Care</h4>
                    <p className="text-xs text-slate-500 mt-1">Front desk and triage managing patient flow.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black mb-8 leading-tight">Unified Access for <br /> Every Stakeholder</h2>
              <div className="space-y-6">
                {[
                  { title: 'Multi-Tenant Isolation', desc: 'Secure, private environments for every hospital under a single platform.' },
                  { title: 'Role-Based Control', desc: 'Granular permissions ensuring every staff member sees exactly what they need.' },
                  { title: 'Universal MPI', desc: 'Cross-facility patient identity management (within tenant scope).' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 text-primary-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link to="/register" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all">
                  Learn more about hospital onboarding <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-1.5 rounded-lg text-white">
              <Activity size={18} />
            </div>
            <span className="text-lg font-black">CarePoint</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 CarePoint HMS. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
