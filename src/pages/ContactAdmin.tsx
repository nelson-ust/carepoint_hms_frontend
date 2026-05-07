import React from 'react';
import { Activity, Mail, Phone, MessageSquare, ChevronLeft, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactAdmin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-xl shadow-primary-600/20 mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Need Access?</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Get in touch with your hospital administrator</p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden relative">
          {/* Decorative Gradient Overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">CarePoint Support Channels</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">If you are a staff member at a hospital using CarePoint, please use the following methods to request your credentials.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-primary-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email IT Support</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Response within 24 hours</p>
                <a href="mailto:it.support@hospital.com" className="text-sm font-bold text-primary-600 flex items-center gap-1 hover:underline">
                  support@carepointhms.com <ExternalLink size={14} />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-primary-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Internal Helpdesk</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Available 24/7 for urgent issues</p>
                <span className="text-sm font-bold text-emerald-600">+234 (0) 800-CAREPOINT</span>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-600/5 border border-primary-600/10">
                  <div className="p-2 bg-primary-600 rounded-lg text-white">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Live Chat with Platform Support</p>
                    <p className="text-xs text-slate-500">Only for platform-wide technical outages</p>
                  </div>
               </div>

               <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">On-Site IT Office</p>
                    <p className="text-xs text-slate-500">Visit Room 204, Administration Wing</p>
                  </div>
               </div>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <Link 
                to="/login"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20"
              >
                <ChevronLeft size={20} />
                <span>Back to Login</span>
              </Link>
              <Link 
                to="/register"
                className="w-full text-center py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Register Your Hospital
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;
