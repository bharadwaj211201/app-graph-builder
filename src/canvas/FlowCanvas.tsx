// import { Background, Controls, ReactFlow } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import { useUIStore } from '../store/uiStore';
// import { useEffect } from 'react';

// export function FlowCanvas({ nodes, edges, setNodes }: any) {
//   const setSelectedNodeId = useUIStore(s => s.setSelectedNodeId);
//   const selectedNodeId = useUIStore(s => s.selectedNodeId);

//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
//         setNodes((nds: any[]) => nds.filter(n => n.id !== selectedNodeId));
//         setSelectedNodeId(null);
//       }
//     };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [selectedNodeId]);

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodeClick={(_, node) => setSelectedNodeId(node.id)}
//       fitView
//     >
//       <Background 
//         variant="dots" 
//         gap={24}
//         size={1}
//         color="#2a2a2a"
//         />
//       <Controls />
//     </ReactFlow>
//   );
// }

import { Background, Controls, ReactFlow } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useUIStore } from '../store/uiStore';
import { ServiceNode } from './ServiceNode';
import { useEffect } from 'react';

type Props = {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
};

export function FlowCanvas({ nodes, edges, setNodes }: Props) {
  const setSelectedNodeId = useUIStore((s) => s.setSelectedNodeId);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);

  /* -----------------------------
    Register custom node types
  ------------------------------ */
  const nodeTypes = {
    service: ServiceNode
  };

  /* -----------------------------
    Delete node on Backspace/Delete
  ------------------------------ */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        (e.key === 'Delete' || e.key === 'Backspace') && 
        selectedNodeId
      ) {
        setNodes((prev) =>
            prev.filter((n) => n.id !== selectedNodeId)
        );
        setSelectedNodeId(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedNodeId, setNodes, setSelectedNodeId]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={(_, node) => setSelectedNodeId(node.id)}
      fitView
    >
      <Background 
        variant="dots" 
        gap={28} 
        size={1} 
        color="#2a2a2a" 
        />
      <Controls />
    </ReactFlow>
  );
}