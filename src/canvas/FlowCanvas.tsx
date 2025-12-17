import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useUIStore } from '../store/uiStore';
import { useEffect } from 'react';

export function FlowCanvas({ nodes, edges, setNodes }: any) {
  const setSelectedNodeId = useUIStore(s => s.setSelectedNodeId);
  const selectedNodeId = useUIStore(s => s.selectedNodeId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        setNodes((nds: any[]) => nds.filter(n => n.id !== selectedNodeId));
        setSelectedNodeId(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedNodeId]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={(_, node) => setSelectedNodeId(node.id)}
      fitView
    >
      <Background variant="dots" gap={14} />
      <Controls />
    </ReactFlow>
  );
}