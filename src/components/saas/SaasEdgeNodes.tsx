import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Plus, Trash2, Loader2, Server, Terminal, Copy, CheckCircle2 } from 'lucide-react';

interface EdgeNode {
  id: number;
  tenant_id: number;
  code: string;
  display_name: string;
  status: string;
  last_heartbeat_at: string;
}

const SaasEdgeNodes: React.FC = () => {
  const [nodes, setNodes] = useState<EdgeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToken, setShowToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNode, setNewNode] = useState({ display_name: '', code: '', tenant_id: 1 });

  const fetchNodes = async () => {
    try {
      const response = await apiClient.get('/edge-nodes');
      setNodes(response.data || []);
    } catch (error) {
      console.error('Failed to fetch nodes', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await apiClient.post('/edge-nodes', newNode);
      setShowToken(response.data.token || response.data.plain_text_token || 'Token Provisioned');
      setIsModalOpen(false);
      fetchNodes();
    } catch (error) {
      console.error('Provisioning failed', error);
      alert('Failed to provision node. Check if tenant ID is valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecommission = async (id: number) => {
    if (!window.confirm('Are you sure you want to decommission this node?')) return;
    setIsProcessing(true);
    try {
      await apiClient.post(`/edge-nodes/${id}/decommission`);
      fetchNodes();
    } catch (error) {
      console.error('Decommission failed', error);
    } finally {
      setIsProcessing(false);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edge Infrastructure</h3>
          <p className="text-slate-500 dark:text-slate-400">Manage regional data nodes and synchronization gateways.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} />
          <span>Provision Node</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nodes.map((node) => (
          <div key={node.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 flex items-center gap-6 group hover:border-primary-500/30 transition-all">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${node.status === 'online' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
               <Server size={32} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-black tracking-tight">{node.display_name}</h4>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${node.status === 'online' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {node.status}
                </span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{node.code} • Tenant ID: {node.tenant_id}</p>
              <p className="text-[10px] text-slate-400 mt-3">Last Heartbeat: {node.last_heartbeat_at ? new Date(node.last_heartbeat_at).toLocaleString() : 'Never'}</p>
            </div>
            <button 
              onClick={() => handleDecommission(node.id)}
              className="p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Provision Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 animate-slideUp overflow-hidden">
             <form onSubmit={handleProvision} className="p-10">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white">
                      <Plus size={28} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black tracking-tight">Provision Node</h3>
                      <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Edge Infrastructure</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Display Name</label>
                      <input 
                        required
                        placeholder="e.g. Lagos West Gateway"
                        value={newNode.display_name}
                        onChange={(e) => setNewNode({ ...newNode, display_name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all"
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Node Code</label>
                        <input 
                          required
                          placeholder="e.g. EDGE-01"
                          value={newNode.code}
                          onChange={(e) => setNewNode({ ...newNode, code: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Tenant ID</label>
                        <input 
                          required
                          type="number"
                          value={newNode.tenant_id}
                          onChange={(e) => setNewNode({ ...newNode, tenant_id: parseInt(e.target.value) })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/20 transition-all"
                        />
                      </div>
                   </div>
                </div>

                <div className="mt-10 flex gap-4">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-all">Cancel</button>
                   <button type="submit" disabled={isProcessing} className="flex-1 px-8 py-5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-600/30 transition-all">
                      {isProcessing ? 'Deploying...' : 'Provision Now'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Token Result Modal */}
      {showToken && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-10 text-center">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
             </div>
             <h3 className="text-2xl font-black tracking-tight">Provisioning Successful</h3>
             <p className="text-slate-500 mt-2">Below is the node access token. Copy it now, as it will **never be shown again**.</p>
             
             <div className="mt-8 bg-slate-950 rounded-2xl p-6 relative group overflow-hidden">
                <Terminal className="absolute top-4 left-4 text-slate-700" size={20} />
                <code className="text-primary-400 font-mono break-all text-sm block px-6">{showToken}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(showToken);
                    alert('Token copied to clipboard!');
                  }}
                  className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  <Copy size={14} />
                  <span>Copy Secure Token</span>
                </button>
             </div>

             <button 
               onClick={() => setShowToken(null)}
               className="mt-10 w-full px-8 py-5 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black uppercase tracking-widest text-xs transition-all"
             >
                I Have Secured the Token
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaasEdgeNodes;
