'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Node color mapping by type
const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  message_input: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800' },
  message_output: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800' },
  condition: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800' },
  database_query: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-800' },
  http_request: { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-800' },
  function: { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-800' },
  state: { bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-800' },
  scheduler: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800' },
  api_endpoint: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800' },
  webhook: { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-800' },
};

const nodeIcons: Record<string, string> = {
  message_input: 'IN',
  message_output: 'OUT',
  condition: 'IF',
  database_query: 'DB',
  http_request: 'HTTP',
  function: 'FN',
  state: 'ST',
  scheduler: 'CLK',
  api_endpoint: 'API',
  webhook: 'WH',
};

interface CustomNodeData {
  label: string;
  type: string;
  config?: Record<string, unknown>;
}

const CustomNode = memo(({ data, selected }: NodeProps<CustomNodeData>) => {
  const colors = nodeColors[data.type] || nodeColors.function;
  const icon = nodeIcons[data.type] || '?';

  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 ${colors.bg} ${colors.border} ${
        selected ? 'ring-2 ring-brand-500 ring-offset-2' : ''
      } shadow-sm transition-shadow hover:shadow-md`}
    >
      {/* Input handle */}
      {data.type !== 'message_input' && data.type !== 'scheduler' && (
        <Handle
          type="target"
          position={Position.Top}
          className="!h-3 !w-3 !border-2 !border-slate-400 !bg-white"
        />
      )}

      {/* Node content */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded text-xs font-bold ${colors.text}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className={`text-sm font-medium ${colors.text}`}>{data.label}</div>
          <div className="text-xs text-slate-500">{data.type.replace(/_/g, ' ')}</div>
        </div>
      </div>

      {/* AI help button */}
      <div className="border-t border-slate-200 px-3 py-1">
        <button className="text-xs text-brand-600 hover:text-brand-800">
          AI Help
        </button>
      </div>

      {/* Output handle */}
      {data.type !== 'message_output' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!h-3 !w-3 !border-2 !border-slate-400 !bg-white"
        />
      )}

      {/* Condition node has two outputs */}
      {data.type === 'condition' && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="true"
            className="!left-[30%] !h-3 !w-3 !border-2 !border-green-500 !bg-white"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="false"
            className="!left-[70%] !h-3 !w-3 !border-2 !border-red-500 !bg-white"
          />
        </>
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export const nodeTypes = {
  message_input: CustomNode,
  message_output: CustomNode,
  condition: CustomNode,
  database_query: CustomNode,
  http_request: CustomNode,
  function: CustomNode,
  state: CustomNode,
  scheduler: CustomNode,
  api_endpoint: CustomNode,
  webhook: CustomNode,
};

export default CustomNode;
