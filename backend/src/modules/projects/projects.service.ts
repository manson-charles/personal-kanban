import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description || '',
        ownerId: userId,
        members: {
          create: { userId, role: 'owner' },
        },
        environments: {
          createMany: {
            data: [
              { type: 'local', status: 'stopped' },
              { type: 'staging', status: 'stopped' },
              { type: 'production', status: 'stopped' },
            ],
          },
        },
      },
      include: {
        members: true,
        environments: true,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
      },
      include: {
        _count: { select: { bots: true, members: true } },
        environments: { select: { id: true, type: true, status: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
        bots: { select: { id: true, name: true, status: true } },
        environments: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isMember = project.members.some((m) => m.userId === userId);
    if (project.ownerId !== userId && !isMember) {
      throw new ForbiddenException('Access denied');
    }

    return project;
  }

  async update(projectId: string, userId: string, dto: UpdateProjectDto) {
    await this.assertOwnerOrEditor(projectId, userId);

    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
    });
  }

  async remove(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== userId) throw new ForbiddenException('Only project owner can delete');

    return this.prisma.project.delete({ where: { id: projectId } });
  }

  private async assertOwnerOrEditor(projectId: string, userId: string) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });

    if (!member || member.role === 'viewer') {
      throw new ForbiddenException('Insufficient permissions');
    }
  }
}
