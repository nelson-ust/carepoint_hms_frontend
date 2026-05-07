import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import RegisterTenant from './pages/RegisterTenant';
import ContactAdmin from './pages/ContactAdmin';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SaasAdminDashboard from './pages/SaasAdminDashboard';
import Documentation from './pages/Documentation';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, isSaasAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-primary-600" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isSaasAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated, isSaasAdmin } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterTenant />} 
      />
      <Route 
        path="/docs" 
        element={<Documentation />} 
      />
      <Route 
        path="/contact-admin" 
        element={<ContactAdmin />} 
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            {isSaasAdmin ? <SaasAdminDashboard /> : <Dashboard />}
          </ProtectedRoute>
        }
      />
      {/* Redirect any other unknown routes to root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
