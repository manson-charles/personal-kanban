import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EnvironmentsService } from './environments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('environments')
@Controller('environments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all environments for a project' })
  findByProject(@Param('projectId') projectId: string) {
    return this.environmentsService.findByProject(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get environment details with deployments' })
  findOne(@Param('id') id: string) {
    return this.environmentsService.findOne(id);
  }

  @Post(':id/deploy')
  @ApiOperation({ summary: 'Trigger deployment to an environment' })
  deploy(@Param('id') id: string, @Body('version') version: string) {
    return this.environmentsService.deploy(id, version);
  }
}
