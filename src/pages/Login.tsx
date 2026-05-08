import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff, Building2 } from 'lucide-react';
import { useTenant } from '../context/TenantContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { tenantCode: detectedTenantCode, tenantConfig, isTenantDomain } = useTenant();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [tenantCode, setTenantCode] = useState(detectedTenantCode || '');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync tenant code from detected subdomain if it changes
  React.useEffect(() => {
    if (detectedTenantCode) {
      setTenantCode(detectedTenantCode);
    }
  }, [detectedTenantCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('[Login] Attempting login for identifier:', identifier, 'Tenant:', tenantCode);
    try {
      // Set the tenant code in storage so the apiClient interceptor picks it up for the X-Tenant-Code header
      if (tenantCode) {
        localStorage.setItem('tenant_code', tenantCode.toUpperCase());
        sessionStorage.setItem('tenant_code', tenantCode.toUpperCase());
      }

      await login({ 
        identifier, 
        password, 
        remember_me: rememberMe 
      });
      console.log('[Login] Login successful');
    } catch (err: any) {
      console.error('[Login] Login failed:', err);
      let errorMessage = 'Invalid credentials. Please try again.';
      
      const detail = err.response?.data?.detail || err.response?.data?.message;
      if (typeof detail === 'string') {
        errorMessage = detail;
      } else if (Array.isArray(detail)) {
        errorMessage = detail.map(d => typeof d === 'string' ? d : (d.msg || JSON.stringify(d))).join(', ');
      } else if (typeof detail === 'object' && detail !== null) {
        errorMessage = detail.msg || JSON.stringify(detail);
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-xl shadow-primary-600/20 mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">CarePoint</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Hospital Management Reimagined</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Welcome Back {tenantConfig?.name ? `to ${tenantConfig.name}` : ''}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/30 animate-shake">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  placeholder="name@hospital.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Active Tenant Code
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={tenantCode}
                  onChange={(e) => setTenantCode(e.target.value)}
                  disabled={!!detectedTenantCode}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none ${!!detectedTenantCode ? 'opacity-70 cursor-not-allowed' : ''}`}
                  placeholder="e.g. stmary"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#" className="text-sm text-primary-600 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-700 rounded transition-all"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3 font-bold transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Not a member yet?{' '}
              <Link to="/register" className="text-primary-600 font-bold hover:underline">
                Register Your Hospital
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
