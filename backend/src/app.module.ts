import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BotsModule } from './modules/bots/bots.module';
import { WorkflowsModule } from './modules/workflows/workflows.module';
import { EnvironmentsModule } from './modules/environments/environments.module';
import { BillingModule } from './modules/billing/billing.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    BotsModule,
    WorkflowsModule,
    EnvironmentsModule,
    BillingModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
