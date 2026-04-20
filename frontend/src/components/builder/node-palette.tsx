'use client';

const nodeTemplates = [
  {
    type: 'message_input',
    label: 'Message Input',
    description: 'Incoming message from a channel',
    category: 'Input/Output',
  },
  {
    type: 'message_output',
    label: 'Message Output',
    description: 'Send a message to user',
    category: 'Input/Output',
  },
  {
    type: 'condition',
    label: 'Condition',
    description: 'If/else branching logic',
    category: 'Logic',
  },
  {
    type: 'database_query',
    label: 'Database Query',
    description: 'SELECT/INSERT/UPDATE/DELETE',
    category: 'Data',
  },
  {
    type: 'http_request',
    label: 'HTTP Request',
    description: 'Call an external API',
    category: 'Integration',
  },
  {
    type: 'function',
    label: 'Function',
    description: 'Custom TS/Python code',
    category: 'Logic',
  },
  {
    type: 'state',
    label: 'State',
    description: 'Manage session state',
    category: 'Logic',
  },
  {
    type: 'scheduler',
    label: 'Scheduler',
    description: 'Periodic/cron tasks',
    category: 'Trigger',
  },
  {
    type: 'api_endpoint',
    label: 'API Endpoint',
    description: 'REST API route handler',
    category: 'Backend',
  },
  {
    type: 'webhook',
    label: 'Webhook',
    description: 'External webhook trigger',
    category: 'Trigger',
  },
];

interface NodePaletteProps {
  onAddNode: (type: string, label: string) => void;
}

export function NodePalette({ onAddNode }: NodePaletteProps) {
  const categories = [...new Set(nodeTemplates.map((n) => n.category))];

  return (
    <div className="w-64 space-y-4 overflow-auto border-r border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">Node Palette</h3>

      {categories.map((category) => (
        <div key={category}>
          <div className="mb-2 text-xs font-medium uppercase text-slate-400">
            {category}
          </div>
          <div className="space-y-1">
            {nodeTemplates
              .filter((n) => n.category === category)
              .map((node) => (
                <button
                  key={node.type}
                  onClick={() => onAddNode(node.type, node.label)}
                  className="flex w-full items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 text-left transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-700">
                      {node.label}
                    </div>
                    <div className="text-xs text-slate-500">{node.description}</div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
