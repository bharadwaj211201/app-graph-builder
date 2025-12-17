import { Handle, Position } from '@xyflow/react';

export function ServiceNode({ data }: any) {
    const statusColor = {
        Healthy: 'bg-green-500/10 text-green-400',
        Degraded: 'bg-yellow-500/10 text-yellow-400',
        Down: 'bg-red-500/10 text-red-400'
    }[data.status];

    return (
        <div className="w-80 rounded-xl bg-neutral-900/90 backdrop-blur border border-neutral-800 shadow-2xl p-4 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-indigo-500/20" />
            <span className="font-semibold text-sm">{data.label}</span>
            </div>

            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
            $0.03/hr
            </span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2 text-xs">
            {['CPU', 'Memory', 'Disk', 'Region'].map((t) => (
            <div
                key={t}
                className="text-center py-1 rounded bg-neutral-800 text-neutral-300"
            >
                {t}
            </div>
            ))}
        </div>

        {/* Slider */}
        <input
            type="range"
            value={data.cpu}
            readOnly
            className="w-full accent-green-400"
        />

        {/* Footer */}
        <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
            {data.status}
            </span>

            <span className="text-xs text-neutral-400">aws</span>
        </div>

        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
        </div>
    );
}