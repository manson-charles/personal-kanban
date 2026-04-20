export enum NodeType {
  MESSAGE_INPUT = 'message_input',
  CONDITION = 'condition',
  DATABASE_QUERY = 'database_query',
  HTTP_REQUEST = 'http_request',
  FUNCTION = 'function',
  STATE = 'state',
  SCHEDULER = 'scheduler',
  MESSAGE_OUTPUT = 'message_output',
  API_ENDPOINT = 'api_endpoint',
  WEBHOOK = 'webhook',
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  position: { x: number; y: number };
  data: NodeData;
  inputs: string[];
  outputs: string[];
}

export interface NodeData {
  [key: string]: unknown;
}

export interface MessageInputNodeData extends NodeData {
  channelType: string;
  patterns: string[];
  commands: string[];
}

export interface ConditionNodeData extends NodeData {
  expression: string;
  trueBranch: string;
  falseBranch: string;
}

export interface DatabaseQueryNodeData extends NodeData {
  operation: 'select' | 'insert' | 'update' | 'delete';
  table: string;
  query: string;
  params: Record<string, unknown>;
}

export interface HttpRequestNodeData extends NodeData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body: unknown;
}

export interface FunctionNodeData extends NodeData {
  language: 'typescript' | 'python';
  code: string;
  timeout: number;
}

export interface SchedulerNodeData extends NodeData {
  cron: string;
  timezone: string;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface Workflow {
  id: string;
  botId: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}
