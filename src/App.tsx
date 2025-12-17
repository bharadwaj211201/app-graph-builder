// import { useEffect, useMemo, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { ReactFlowProvider } from '@xyflow/react';
// import type { Node, Edge } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

// import { fetchApps, fetchGraph } from './api/queries';
// import { FlowCanvas } from './canvas/FlowCanvas';
// import { NodeInspector } from './inspector/NodeInspector';
// import { useUIStore } from './store/uiStore';

// /* -----------------------------
//  Types
// ------------------------------ */
// type AppItem = {
//   id: string;
//   name: string;
// };

// type GraphResponse = {
//   nodes: Node[];
//   edges: Edge[];
// };

// /* -----------------------------
//  App Component
// ------------------------------ */
// export default function App() {
//   /* -----------------------------
//     Zustand state
//   ------------------------------ */
//   const {
//     selectedAppId,
//     setSelectedAppId,
//     selectedNodeId,
//     setSelectedNodeId,
//     isMobilePanelOpen,
//     toggleMobilePanel
//   } = useUIStore();

//   /* -----------------------------
//     Fetch apps list
//   ------------------------------ */
//   const {
//     data: apps,
//     isLoading: appsLoading,
//     isError: appsError
//   } = useQuery<AppItem[]>({
//     queryKey: ['apps'],
//     queryFn: fetchApps
//   });

//   /* Auto-select first app */
//   useEffect(() => {
//     if (!selectedAppId && apps && apps.length > 0) {
//       setSelectedAppId(apps[0].id);
//     }
//   }, [apps, selectedAppId, setSelectedAppId]);

//   /* -----------------------------
//     Fetch graph for selected app
//   ------------------------------ */
//   const {
//     data: graph,
//     isLoading: graphLoading,
//     isError: graphError
//   } = useQuery<GraphResponse>({
//     queryKey: ['graph', selectedAppId],
//     queryFn: () => fetchGraph(selectedAppId as string),
//     enabled: Boolean(selectedAppId)
//   });

//   /* -----------------------------
//     ReactFlow local state
//   ------------------------------ */
//   const [nodes, setNodes] = useState<Node[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);

//   useEffect(() => {
//     if (graph) {
//       setNodes(graph.nodes);
//       setEdges(graph.edges);
//       setSelectedNodeId(null);
//     }
//   }, [graph, setSelectedNodeId]);

//   /* -----------------------------
//     Selected node (derived)
//   ------------------------------ */
//   const selectedNode = useMemo(
//     () => nodes.find((n) => n.id === selectedNodeId),
//     [nodes, selectedNodeId]
//   );

//   /* -----------------------------
//     Update selected node helper
//   ------------------------------ */
//   const updateNodeData = (partialData: Record<string, unknown>) => {
//     if (!selectedNode) return;

//     setNodes((prev) =>
//       prev.map((node) =>
//         node.id === selectedNode.id
//           ? {
//               ...node,
//               data: {
//                 ...node.data,
//                 ...partialData
//               }
//             }
//           : node
//       )
//     );
//   };

//   /* -----------------------------
//     Render
//   ------------------------------ */
//   return (
//     <ReactFlowProvider>
//       <div className="flex h-screen bg-neutral-950 text-white">
//         {/* -----------------------------
//           Left Rail
//         ------------------------------ */}
//         <aside className="w-14 border-r border-neutral-800 flex flex-col items-center py-4">
//           <span className="text-lg font-bold">⚡</span>
//         </aside>

//         {/* -----------------------------
//           Main Area
//         ------------------------------ */}
//         <div className="flex flex-1 flex-col">
//           {/* Top Bar */}
//           <header className="h-12 border-b border-neutral-800 flex items-center justify-between px-4">
//             <h1 className="font-semibold">App Graph Builder</h1>
//             <button
//               onClick={toggleMobilePanel}
//               className="md:hidden text-sm bg-neutral-800 px-3 py-1 rounded"
//             >
//               Inspector
//             </button>
//           </header>

//           {/* Content */}
//           <div className="flex flex-1 overflow-hidden">
//             {/* -----------------------------
//               Canvas
//             ------------------------------ */}
//             <main className="flex-1 relative">
//               {graphLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
//                   Loading graph...
//                 </div>
//               )}

//               {graphError && (
//                 <div className="absolute inset-0 flex items-center justify-center text-red-500">
//                   Failed to load graph
//                 </div>
//               )}

//               {!graphLoading && graph && (
//                 <FlowCanvas
//                   nodes={nodes}
//                   edges={edges}
//                   setNodes={setNodes}
//                 />
//               )}
//             </main>

//             {/* -----------------------------
//               Right Panel (Desktop)
//             ------------------------------ */}
//             <aside className="hidden md:flex w-80 flex-col border-l border-neutral-800">
//               {/* Apps */}
//               <div className="border-b border-neutral-800 p-3 font-semibold">
//                 Applications
//               </div>

//               <div className="p-3 space-y-2">
//                 {appsLoading && <div>Loading apps...</div>}
//                 {appsError && (
//                   <div className="text-red-500">Failed to load apps</div>
//                 )}

//                 {apps?.map((app) => (
//                   <button
//                     key={app.id}
//                     onClick={() => setSelectedAppId(app.id)}
//                     className={`w-full text-left px-3 py-2 rounded ${
//                       selectedAppId === app.id
//                         ? 'bg-neutral-800'
//                         : 'hover:bg-neutral-900'
//                     }`}
//                   >
//                     {app.name}
//                   </button>
//                 ))}
//               </div>

//               {/* Inspector */}
//               <div className="border-t border-neutral-800 flex-1 overflow-auto">
//                 <NodeInspector
//                   node={selectedNode}
//                   updateNode={updateNodeData}
//                 />
//               </div>
//             </aside>
//           </div>
//         </div>

//         {/* -----------------------------
//           Mobile Inspector Drawer
//         ------------------------------ */}
//         {isMobilePanelOpen && (
//           <div className="fixed inset-0 z-50 bg-black/60 md:hidden">
//             <div className="absolute right-0 top-0 h-full w-80 bg-neutral-900 border-l border-neutral-800">
//               <NodeInspector
//                 node={selectedNode}
//                 updateNode={updateNodeData}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </ReactFlowProvider>
//   );
// }

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { fetchApps, fetchGraph } from './api/queries';
import { FlowCanvas } from './canvas/FlowCanvas';
import { NodeInspector } from './inspector/NodeInspector';
import { useUIStore } from './store/uiStore';

/* -----------------------------
 Types
------------------------------ */
type AppItem = {
  id: string;
  name: string;
};

type GraphResponse = {
  nodes: Node[];
  edges: Edge[];
};

/* -----------------------------
 App Component
------------------------------ */
export default function App() {
  /* -----------------------------
    Zustand UI state
  ------------------------------ */
  const {
    selectedAppId,
    setSelectedAppId,
    selectedNodeId,
    setSelectedNodeId,
    isMobilePanelOpen,
    toggleMobilePanel
  } = useUIStore();

  /* -----------------------------
    Fetch applications
  ------------------------------ */
  const {
    data: apps,
    isLoading: appsLoading,
    isError: appsError
  } = useQuery<AppItem[]>({
    queryKey: ['apps'],
    queryFn: fetchApps
  });

  /* Auto-select first app */
  useEffect(() => {
    if (!selectedAppId && apps?.length) {
      setSelectedAppId(apps[0].id);
    }
  }, [apps, selectedAppId, setSelectedAppId]);

  /* -----------------------------
    Fetch graph for selected app
  ------------------------------ */
  const {
    data: graph,
    isLoading: graphLoading,
    isError: graphError
  } = useQuery<GraphResponse>({
    queryKey: ['graph', selectedAppId],
    queryFn: () => fetchGraph(selectedAppId as string),
    enabled: Boolean(selectedAppId)
  });

  /* -----------------------------
    ReactFlow local state
  ------------------------------ */
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (graph) {
      setNodes(graph.nodes);
      setEdges(graph.edges);
      setSelectedNodeId(null);
    }
  }, [graph, setSelectedNodeId]);

  /* -----------------------------
    Derived selected node
  ------------------------------ */
  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId),
    [nodes, selectedNodeId]
  );

  /* -----------------------------
    Update selected node data
  ------------------------------ */
  const updateNodeData = (partialData: Record<string, unknown>) => {
    if (!selectedNode) return;

    setNodes((prev) =>
      prev.map((node) =>
        node.id === selectedNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...partialData
              }
            }
          : node
      )
    );
  };

  /* -----------------------------
    Render
  ------------------------------ */
  return (
    <ReactFlowProvider>
      <div className="flex h-screen bg-neutral-950 text-white">
        {/* -----------------------------
          Left Rail
        ------------------------------ */}
        <aside className="w-14 border-r border-neutral-800 flex flex-col items-center py-4">
          <span className="text-lg font-bold">⚡</span>
        </aside>

        {/* -----------------------------
          Main Area
        ------------------------------ */}
        <div className="flex flex-1 flex-col">
          {/* Top Bar */}
          <header className="h-12 border-b border-neutral-800 flex items-center justify-between px-4">
            <h1 className="font-semibold">App Graph Builder</h1>

            <button
              onClick={toggleMobilePanel}
              className="md:hidden text-sm bg-neutral-800 px-3 py-1 rounded"
            >
              Inspector
            </button>
          </header>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* -----------------------------
              Canvas
            ------------------------------ */}
            <main className="flex-1 relative">
              <div className='h-full w-full'>
                {graphLoading && (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    Loading graph…
                  </div>
                )}
              </div>
              

              {graphError && (
                <div className="absolute inset-0 flex items-center justify-center text-red-500">
                  Failed to load graph
                </div>
              )}

              {!graphLoading && graph && (
                <FlowCanvas
                  nodes={nodes}
                  edges={edges}
                  setNodes={setNodes}
                />
              )}
            </main>

            {/* -----------------------------
              Right Panel (Desktop)
            ------------------------------ */}
            <aside className="hidden md:flex w-96 flex-col border-l border-neutral-800 bg-neutral-950/80 backdrop-blur">
              {/* Applications */}
              <div className="border-b border-neutral-800 p-3">
                <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  Application
                </h3>
              </div>

              <div className="p-3 space-y-1">
                {appsLoading && <div>Loading apps…</div>}
                {appsError && (
                  <div className="text-red-500">Failed to load apps</div>
                )}

                {apps?.map((app) => (

                  <button
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      selectedAppId === app.id
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'hover:bg-neutral-800'
                    }`}
                  >
                    <div className="h-8 w-8 rounded bg-indigo-500/20" />
                    <span className="text-sm">{app.name}</span>
                  </button>
                ))}
              </div>

              {/* Inspector */}
              <div className="border-t border-neutral-800 flex-1 overflow-auto">
                <NodeInspector
                  node={selectedNode}
                  updateNode={updateNodeData}
                />
              </div>
            </aside>
          </div>
        </div>

        {/* -----------------------------
          Mobile Inspector Drawer
        ------------------------------ */}
        {isMobilePanelOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 md:hidden">
            <div className="absolute right-0 top-0 h-full w-96 bg-neutral-900 border-l border-neutral-800">
              <NodeInspector
                node={selectedNode}
                updateNode={updateNodeData}
              />
            </div>
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
}