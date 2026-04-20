import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(projectId: string, dto: CreateBotDto) {
    return this.prisma.bot.create({
      data: {
        projectId,
        name: dto.name,
        description: dto.description || '',
        channels: dto.channels
          ? {
              createMany: {
                data: dto.channels.map((ch) => ({
                  channelType: ch.type,
                  enabled: ch.enabled ?? true,
                  config: ch.config || {},
                })),
              },
            }
          : undefined,
        workflows: {
          create: {
            name: 'Main Workflow',
          },
        },
      },
      include: {
        channels: true,
        workflows: { select: { id: true, name: true } },
      },
    });
  }

  async findAllByProject(projectId: string) {
    return this.prisma.bot.findMany({
      where: { projectId },
      include: {
        channels: { select: { channelType: true, enabled: true } },
        _count: { select: { workflows: true, apiRoutes: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(botId: string) {
    const bot = await this.prisma.bot.findUnique({
      where: { id: botId },
      include: {
        channels: true,
        workflows: true,
        apiRoutes: true,
      },
    });

    if (!bot) throw new NotFoundException('Bot not found');
    return bot;
  }

  async update(botId: string, dto: UpdateBotDto) {
    return this.prisma.bot.update({
      where: { id: botId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.status && { status: dto.status }),
      },
    });
  }

  async remove(botId: string) {
    return this.prisma.bot.delete({ where: { id: botId } });
  }
}
