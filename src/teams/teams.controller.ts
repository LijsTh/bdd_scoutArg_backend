import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamEntity } from './entities/team.entity';
import { PlayerEntity } from '../players/entities/player.entity';


@Controller('teams')
@ApiTags('Teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiCreatedResponse({ type: TeamEntity })
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  } 

  @Get()
  @ApiOkResponse({ type: TeamEntity, isArray: true })
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TeamEntity })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Get(':id/players')
  @ApiOkResponse({ type: [PlayerEntity] })
  async findPlayersByTeam(@Param('id') id: string) {
    return this.teamsService.findPlayersByTeamId(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TeamEntity })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TeamEntity })
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
