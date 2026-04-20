export enum EnvironmentType {
  LOCAL = 'local',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export interface Environment {
  id: string;
  projectId: string;
  type: EnvironmentType;
  domain?: string;
  databaseUrl?: string;
  status: 'running' | 'stopped' | 'deploying' | 'error';
  resources: EnvironmentResources;
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentResources {
  cpuLimit: string;
  memoryLimit: string;
  maxReplicas: number;
}

export interface DeploymentRecord {
  id: string;
  environmentId: string;
  version: string;
  status: 'pending' | 'building' | 'deploying' | 'live' | 'failed' | 'rolled_back';
  commitHash?: string;
  imageTag?: string;
  startedAt: string;
  completedAt?: string;
  logs: string[];
}
