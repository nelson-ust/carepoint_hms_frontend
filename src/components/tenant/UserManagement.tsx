import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Users, UserPlus, Shield, MoreVertical, Loader2, CheckCircle2, XCircle, Edit2, X } from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', first_name: '', last_name: '', role: 'Doctor' });

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await apiClient.post('/invitations/send', inviteData);
      alert('Invitation sent successfully!');
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Invite failed', error);
      alert('Failed to send invitation.');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleUserStatus = async (id: number, currentStatus: boolean) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this user?`)) return;
    try {
      await apiClient.put(`/users/${id}/status`, { is_active: !currentStatus });
      fetchUsers();
    } catch (error) {
      console.error('Status update failed', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Staff Management</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage hospital staff access, roles, and permissions.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20"
        >
          <UserPlus size={20} />
          <span>Invite Staff</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4">Staff Member</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary-600 font-bold">
                      {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">{user.first_name} {user.last_name}</span>
                      <span className="text-xs text-slate-500">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <Shield size={14} className="text-primary-500" />
                    <span>{user.role || 'Staff'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleUserStatus(user.id, user.is_active)}
                    className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg transition-all ${user.is_active ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' : 'text-slate-500 bg-slate-50 hover:bg-slate-100'
                      }`}
                  >
                    {user.is_active ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {user.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
                    <Edit2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Users size={48} className="opacity-20" />
                    <p>No staff members found. Start by inviting your team.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 animate-slideUp overflow-hidden">
            <form onSubmit={handleInvite}>
              <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white">
                    <UserPlus size={28} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Invite Staff</h3>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">First Name</label>
                    <input required value={inviteData.first_name} onChange={e => setInviteData({ ...inviteData, first_name: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Last Name</label>
                    <input required value={inviteData.last_name} onChange={e => setInviteData({ ...inviteData, last_name: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Email Address</label>
                  <input required type="email" value={inviteData.email} onChange={e => setInviteData({ ...inviteData, email: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">System Role</label>
                  <select value={inviteData.role} onChange={e => setInviteData({ ...inviteData, role: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20">
                    <option>Doctor</option>
                    <option>Nurse</option>
                    <option>Pharmacist</option>
                    <option>Laboratory Scientist</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>

              <div className="p-10 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-700">Cancel</button>
                <button type="submit" disabled={isProcessing} className="flex-1 px-8 py-5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-600/30">
                  {isProcessing ? 'Sending...' : 'Send Invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
