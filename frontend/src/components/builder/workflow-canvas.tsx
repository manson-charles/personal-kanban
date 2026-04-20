'use client';

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '@/store/workflow-store';
import { nodeTypes } from './custom-nodes';
import { NodePalette } from './node-palette';

export function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNodeId,
    isDirty,
  } = useWorkflowStore();

  const handleAddNode = useCallback(
    (type: string, label: string) => {
      const id = `node_${Date.now()}`;
      addNode({
        id,
        type,
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100,
        },
        data: { label, type, config: {} },
      });
    },
    [addNode],
  );

  return (
    <div className="flex h-full">
      <NodePalette onAddNode={handleAddNode} />

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          fitView
          snapToGrid
          snapGrid={[16, 16]}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background gap={16} size={1} />
          <Controls />
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="!rounded-lg !border !border-slate-200 !shadow-md"
          />

          <Panel position="top-right">
            <div className="flex items-center gap-2">
              {isDirty && (
                <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-700">
                  Unsaved changes
                </span>
              )}
              <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
                Save Workflow
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
