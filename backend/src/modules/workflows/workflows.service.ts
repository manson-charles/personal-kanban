import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SaveWorkflowDto } from './dto/save-workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByBot(botId: string) {
    return this.prisma.workflow.findMany({
      where: { botId },
      include: {
        nodes: true,
        edges: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(workflowId: string) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id: workflowId },
      include: {
        nodes: { orderBy: { createdAt: 'asc' } },
        edges: true,
      },
    });

    if (!workflow) throw new NotFoundException('Workflow not found');
    return workflow;
  }

  async save(workflowId: string, dto: SaveWorkflowDto) {
    // Transactional update: delete existing nodes/edges and recreate
    return this.prisma.$transaction(async (tx) => {
      // Delete existing edges and nodes
      await tx.workflowEdge.deleteMany({ where: { workflowId } });
      await tx.workflowNode.deleteMany({ where: { workflowId } });

      // Create new nodes
      if (dto.nodes?.length) {
        await tx.workflowNode.createMany({
          data: dto.nodes.map((node) => ({
            id: node.id,
            workflowId,
            type: node.type,
            label: node.label || '',
            positionX: node.position.x,
            positionY: node.position.y,
            data: node.data || {},
          })),
        });
      }

      // Create new edges
      if (dto.edges?.length) {
        await tx.workflowEdge.createMany({
          data: dto.edges.map((edge) => ({
            id: edge.id,
            workflowId,
            sourceId: edge.source,
            targetId: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
            label: edge.label,
          })),
        });
      }

      // Update workflow name if provided
      if (dto.name) {
        await tx.workflow.update({
          where: { id: workflowId },
          data: { name: dto.name },
        });
      }

      return tx.workflow.findUnique({
        where: { id: workflowId },
        include: { nodes: true, edges: true },
      });
    });
  }

  async remove(workflowId: string) {
    return this.prisma.workflow.delete({ where: { id: workflowId } });
  }
}
