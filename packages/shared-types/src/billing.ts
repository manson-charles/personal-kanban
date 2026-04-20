export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
}

export interface UsageMetrics {
  userId: string;
  period: string;
  apiRequests: number;
  dbStorageMb: number;
  bandwidthMb: number;
  cpuTimeSeconds: number;
  botsCount: number;
}

export interface PlanLimits {
  tier: string;
  maxBots: number;
  maxApiRequestsPerMonth: number;
  maxDbStorageMb: number;
  maxBandwidthMb: number;
  maxCpuTimeSecondsPerMonth: number;
  customDomain: boolean;
  prioritySupport: boolean;
  sso: boolean;
}

export const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    tier: 'free',
    maxBots: 2,
    maxApiRequestsPerMonth: 10_000,
    maxDbStorageMb: 100,
    maxBandwidthMb: 1_000,
    maxCpuTimeSecondsPerMonth: 3_600,
    customDomain: false,
    prioritySupport: false,
    sso: false,
  },
  starter: {
    tier: 'starter',
    maxBots: 10,
    maxApiRequestsPerMonth: 100_000,
    maxDbStorageMb: 1_000,
    maxBandwidthMb: 10_000,
    maxCpuTimeSecondsPerMonth: 36_000,
    customDomain: false,
    prioritySupport: false,
    sso: false,
  },
  pro: {
    tier: 'pro',
    maxBots: -1, // unlimited
    maxApiRequestsPerMonth: 1_000_000,
    maxDbStorageMb: 10_000,
    maxBandwidthMb: 100_000,
    maxCpuTimeSecondsPerMonth: 360_000,
    customDomain: true,
    prioritySupport: true,
    sso: false,
  },
  enterprise: {
    tier: 'enterprise',
    maxBots: -1,
    maxApiRequestsPerMonth: -1,
    maxDbStorageMb: -1,
    maxBandwidthMb: -1,
    maxCpuTimeSecondsPerMonth: -1,
    customDomain: true,
    prioritySupport: true,
    sso: true,
  },
};
