import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) throw new NotFoundException('Subscription not found');
    return subscription;
  }

  async getUsage(userId: string) {
    const currentPeriod = new Date().toISOString().slice(0, 7); // YYYY-MM

    let usage = await this.prisma.usageRecord.findUnique({
      where: { userId_period: { userId, period: currentPeriod } },
    });

    if (!usage) {
      usage = await this.prisma.usageRecord.create({
        data: { userId, period: currentPeriod },
      });
    }

    return usage;
  }

  async upgradeTier(userId: string, tier: string) {
    const validTiers = ['free', 'starter', 'pro', 'enterprise'];
    if (!validTiers.includes(tier)) {
      throw new NotFoundException('Invalid subscription tier');
    }

    // In production, this would create a Stripe checkout session
    // For now, directly update the tier
    return this.prisma.subscription.update({
      where: { userId },
      data: {
        tier,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async recordApiUsage(userId: string, count: number = 1) {
    const currentPeriod = new Date().toISOString().slice(0, 7);

    return this.prisma.usageRecord.upsert({
      where: { userId_period: { userId, period: currentPeriod } },
      update: { apiRequests: { increment: count } },
      create: { userId, period: currentPeriod, apiRequests: count },
    });
  }
}
