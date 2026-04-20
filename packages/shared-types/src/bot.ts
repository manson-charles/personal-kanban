export enum BotStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  ERROR = 'error',
  ARCHIVED = 'archived',
}

export interface Bot {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: BotStatus;
  channels: ChannelConfig[];
  createdAt: string;
  updatedAt: string;
}

export interface ChannelConfig {
  type: ChannelType;
  enabled: boolean;
  config: Record<string, unknown>;
}

export enum ChannelType {
  TELEGRAM = 'telegram',
  DISCORD = 'discord',
  WHATSAPP = 'whatsapp',
  WEB_CHAT = 'web_chat',
}
