import { useUIStore } from '../store/uiStore';

export function NodeInspector({ node, updateNode }: any) {
  const tab = useUIStore(s => s.activeInspectorTab);
  const setTab = useUIStore(s => s.setActiveTab);

  if (!node) return <div className="p-4">Select a node</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="font-bold">{node.data.label}</div>

      <div>
        <button onClick={() => setTab('config')}>Config</button>
        <button onClick={() => setTab('runtime')}>Runtime</button>
      </div>

      {tab === 'config' && (
        <>
          <input
            value={node.data.label}
            onChange={(e) =>
              updateNode({ label: e.target.value })
            }
          />
          <input
            type="range"
            min={0}
            max={100}
            value={node.data.cpu}
            onChange={(e) =>
              updateNode({ cpu: Number(e.target.value) })
            }
          />
          <input
            type="number"
            value={node.data.cpu}
            onChange={(e) =>
              updateNode({ cpu: Number(e.target.value) })
            }
          />
        </>
      )}
    </div>
  );
}