import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class EnvironmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProject(projectId: string) {
    return this.prisma.environment.findMany({
      where: { projectId },
      include: {
        deployments: {
          orderBy: { startedAt: 'desc' },
          take: 5,
        },
      },
    });
  }

  async findOne(envId: string) {
    const env = await this.prisma.environment.findUnique({
      where: { id: envId },
      include: {
        deployments: { orderBy: { startedAt: 'desc' }, take: 10 },
      },
    });

    if (!env) throw new NotFoundException('Environment not found');
    return env;
  }

  async deploy(envId: string, version: string) {
    const env = await this.prisma.environment.findUnique({
      where: { id: envId },
    });

    if (!env) throw new NotFoundException('Environment not found');

    // Create deployment record
    const deployment = await this.prisma.deployment.create({
      data: {
        environmentId: envId,
        version,
        status: 'pending',
      },
    });

    // Update environment status
    await this.prisma.environment.update({
      where: { id: envId },
      data: { status: 'deploying' },
    });

    // In production, this would trigger actual container deployment via K8s API
    // For now, simulate by marking as live after creation
    await this.prisma.deployment.update({
      where: { id: deployment.id },
      data: { status: 'live', completedAt: new Date() },
    });

    await this.prisma.environment.update({
      where: { id: envId },
      data: { status: 'running' },
    });

    return deployment;
  }
}
