'use client';

import { WorkflowCanvas } from '@/components/builder/workflow-canvas';

export default function BuilderPage() {
  return (
    <div className="-m-6 flex h-[calc(100vh)] flex-col">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`border-b-2 px-4 py-3 text-sm font-medium ${
                tab.id === 'backend'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
            Test Bot
          </button>
          <button className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
            Deploy
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <WorkflowCanvas />
      </div>
    </div>
  );
}

const tabs = [
  { id: 'bot', label: 'Bot' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'deploy', label: 'Deploy' },
  { id: 'monetization', label: 'Monetization' },
];
