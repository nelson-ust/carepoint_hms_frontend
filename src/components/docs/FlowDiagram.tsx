import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType,
  Position,
  type Node,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeStyle = {
  background: 'rgba(15, 23, 42, 0.8)',
  color: '#fff',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '12px 20px',
  fontSize: '12px',
  fontWeight: '900',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  width: 180,
} as const;

const initialNodes: Node[] = [
  // Common Start
  { id: '1', data: { label: 'Patient Registration' }, position: { x: 0, y: 100 }, style: { ...nodeStyle, borderColor: '#3b82f6' } },
  
  // Outpatient
  { id: '2', data: { label: 'Triage & Vitals' }, position: { x: 250, y: 0 }, style: nodeStyle },
  { id: '3', data: { label: 'Consultation' }, position: { x: 500, y: 0 }, style: nodeStyle },
  { id: '4', data: { label: 'Pharmacy / Lab' }, position: { x: 750, y: 0 }, style: nodeStyle },
  
  // Inpatient
  { id: '5', data: { label: 'Admission Desk' }, position: { x: 250, y: 150 }, style: nodeStyle },
  { id: '6', data: { label: 'Ward Assignment' }, position: { x: 500, y: 150 }, style: nodeStyle },
  { id: '7', data: { label: 'Nursing Care' }, position: { x: 750, y: 150 }, style: nodeStyle },
  
  // Specialized
  { id: '8', data: { label: 'Surgical / Radiology' }, position: { x: 500, y: 250 }, style: nodeStyle },

  // Common End
  { id: '9', data: { label: 'Billing & Invoicing' }, position: { x: 1000, y: 100 }, style: { ...nodeStyle, borderColor: '#f59e0b' } },
  { id: '10', data: { label: 'Payment / Discharge' }, position: { x: 1250, y: 100 }, style: { ...nodeStyle, borderColor: '#10b981' } },
];

const initialEdges: Edge[] = [
  // Outpatient Flow
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-9', source: '4', target: '9', animated: true },

  // Inpatient Flow
  { id: 'e1-5', source: '1', target: '5', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-9', source: '7', target: '9', animated: true },

  // Specialized Link
  { id: 'e3-8', source: '3', target: '8', label: 'Referral', animated: true, style: { strokeDasharray: '5,5' } },
  { id: 'e8-9', source: '8', target: '9', animated: true },

  // Finalization
  { id: 'e9-10', source: '9', target: '10', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }, style: { stroke: '#10b981' } },
];

const FlowDiagram: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '500px' }} className="rounded-[2.5rem] overflow-hidden border border-white/5 bg-black/40 backdrop-blur-md">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        zoomOnScroll={false}
        panOnScroll={false}
        attributionPosition="bottom-right"
      >
        <Background color="#1e293b" gap={20} />
        <Controls showInteractive={false} className="!bg-slate-900 !border-white/10 !fill-white" />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
