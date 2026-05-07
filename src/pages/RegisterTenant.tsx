import React, { useState } from 'react';
import { Activity, Hospital, User, Globe, CreditCard, ChevronRight, CheckCircle2, Loader2, Mail, Phone, Lock } from 'lucide-react';
import apiClient from '../api/apiClient';

const RegisterTenant: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    tenant_name: '',
    tenant_code: '',
    domain_url: '',
    billing_email: '',
    billing_phone: '',
    billing_contact_name: '',
    billing_address: '',
    plan_code: 'basic',
    admin_email: '',
    admin_username: '',
    admin_password: '',
    admin_first_name: '',
    admin_last_name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post('/tenants/register', formData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-800">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Application Submitted!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Thank you for choosing CarePoint. Our team will review your application and contact you at <strong>{formData.billing_email}</strong> shortly.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3 font-bold transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-xl shadow-primary-600/20 mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Join CarePoint</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Scale your hospital operations with ease.</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-12 max-w-xl mx-auto px-4">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex flex-col items-center gap-2 relative z-10`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step === s ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 scale-110' : 
                  step > s ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </div>
                <span className={`text-xs font-bold ${step === s ? 'text-primary-600' : 'text-slate-400'}`}>
                  {s === 1 ? 'Hospital' : s === 2 ? 'Admin' : 'Plan'}
                </span>
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${step > s ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Hospital Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <Hospital className="text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hospital Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hospital Name</label>
                    <input name="tenant_name" value={formData.tenant_name} onChange={handleChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="e.g. St. Mary Hospital" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Preferred Tenant Code</label>
                    <input name="tenant_code" value={formData.tenant_code} onChange={handleChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="e.g. STMARY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Preferred Subdomain</label>
                    <div className="flex items-center">
                      <input name="domain_url" value={formData.domain_url} onChange={handleChange} required className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-l-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="stmary" />
                      <span className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-r-xl text-slate-500 border-l border-slate-200 dark:border-slate-700 text-sm">.carepointhms.com</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Billing Email</label>
                    <input type="email" name="billing_email" value={formData.billing_email} onChange={handleChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="billing@hospital.com" />
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Physical Address</label>
                  <textarea name="billing_address" value={formData.billing_address} onChange={handleChange} rows={3} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="Full hospital address..."></textarea>
                </div>
              </div>
            )}

            {/* Step 2: Admin Account */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admin Account Setup</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                    <input name="admin_first_name" value={formData.admin_first_name} onChange={handleChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                    <input name="admin_last_name" value={formData.admin_last_name} onChange={handleChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Work Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="email" name="admin_email" value={formData.admin_email} onChange={handleChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="admin@hospital.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="password" name="admin_password" value={formData.admin_password} onChange={handleChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Plan Selection */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn text-center">
                <div className="flex flex-col items-center gap-3 mb-8">
                  <CreditCard className="text-primary-600" size={32} />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Choose Your Plan</h3>
                  <p className="text-slate-500">Select the package that fits your hospital size.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div 
                    onClick={() => setFormData({...formData, plan_code: 'basic'})}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.plan_code === 'basic' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                  >
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Basic</h4>
                    <p className="text-slate-500 text-sm mb-4">Small clinics & private practices</p>
                    <div className="text-2xl font-black text-primary-600 mb-4">$49<span className="text-sm font-normal text-slate-500">/mo</span></div>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 text-left">
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Up to 500 patients</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> 2 Facilities</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Basic clinical tools</li>
                    </ul>
                  </div>

                  <div 
                    onClick={() => setFormData({...formData, plan_code: 'enterprise'})}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.plan_code === 'enterprise' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                  >
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Enterprise</h4>
                    <p className="text-slate-500 text-sm mb-4">Full-scale multi-ward hospitals</p>
                    <div className="text-2xl font-black text-primary-600 mb-4">$199<span className="text-sm font-normal text-slate-500">/mo</span></div>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 text-left">
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Unlimited patients</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Unlimited Facilities</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Full Lab & Pharmacy</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Back</button>
              ) : (
                <button type="button" onClick={() => window.location.href = '/login'} className="text-slate-500 text-sm hover:underline">Already have an account? Sign In</button>
              )}
              
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="px-10 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20 flex items-center gap-2">
                  <span>Continue</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button type="submit" disabled={isLoading} className="px-10 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20 flex items-center gap-2 disabled:opacity-70">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Complete Application</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterTenant;
