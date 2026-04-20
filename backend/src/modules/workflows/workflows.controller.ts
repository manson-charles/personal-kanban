import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkflowsService } from './workflows.service';
import { SaveWorkflowDto } from './dto/save-workflow.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('workflows')
@Controller('workflows')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get('bot/:botId')
  @ApiOperation({ summary: 'Get all workflows for a bot' })
  findByBot(@Param('botId') botId: string) {
    return this.workflowsService.findByBot(botId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workflow with nodes and edges' })
  findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Save workflow (nodes and edges)' })
  save(@Param('id') id: string, @Body() dto: SaveWorkflowDto) {
    return this.workflowsService.save(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete workflow' })
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(id);
  }
}
