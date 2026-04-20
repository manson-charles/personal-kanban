export interface TelegramChannelConfig {
  botToken: string;
  webhookUrl?: string;
  usePolling: boolean;
}

export interface DiscordChannelConfig {
  botToken: string;
  applicationId: string;
  guildIds: string[];
}

export interface WhatsAppChannelConfig {
  provider: 'twilio' | 'meta' | '360dialog';
  apiKey: string;
  phoneNumber: string;
}

export interface WebChatChannelConfig {
  widgetTitle: string;
  primaryColor: string;
  position: 'bottom-right' | 'bottom-left';
  allowedOrigins: string[];
}
