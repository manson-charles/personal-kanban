import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('billing')
@Controller('billing')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscription')
  @ApiOperation({ summary: 'Get current subscription' })
  getSubscription(@CurrentUser('id') userId: string) {
    return this.billingService.getSubscription(userId);
  }

  @Get('usage')
  @ApiOperation({ summary: 'Get current usage metrics' })
  getUsage(@CurrentUser('id') userId: string) {
    return this.billingService.getUsage(userId);
  }

  @Post('upgrade')
  @ApiOperation({ summary: 'Upgrade subscription tier' })
  upgrade(@CurrentUser('id') userId: string, @Body('tier') tier: string) {
    return this.billingService.upgradeTier(userId, tier);
  }
}
