import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('bots')
@Controller('projects/:projectId/bots')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bot in a project' })
  create(@Param('projectId') projectId: string, @Body() dto: CreateBotDto) {
    return this.botsService.create(projectId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all bots in a project' })
  findAll(@Param('projectId') projectId: string) {
    return this.botsService.findAllByProject(projectId);
  }

  @Get(':botId')
  @ApiOperation({ summary: 'Get bot details' })
  findOne(@Param('botId') botId: string) {
    return this.botsService.findOne(botId);
  }

  @Put(':botId')
  @ApiOperation({ summary: 'Update bot' })
  update(@Param('botId') botId: string, @Body() dto: UpdateBotDto) {
    return this.botsService.update(botId, dto);
  }

  @Delete(':botId')
  @ApiOperation({ summary: 'Delete bot' })
  remove(@Param('botId') botId: string) {
    return this.botsService.remove(botId);
  }
}
