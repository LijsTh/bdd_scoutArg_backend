import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamEntity } from './entities/team.entity';
import { PlayerEntity } from '../players/entities/player.entity';
import { UserEntity } from '../users/entities/user.entity';
import { RequestErrorBuilder } from 'src/exceptions/http-exception/request-error-builder';

@Controller('teams')
@ApiTags('Teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    @ApiCreatedResponse({ type: TeamEntity })
    async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamEntity> {
        const team = await this.teamsService.create(createTeamDto);
        if (!team) {
            throw RequestErrorBuilder.throwFormattedPostError('Team');
        }
        return new TeamEntity(team);
    }

    @Get()
    @ApiOkResponse({ type: TeamEntity, isArray: true })
    async findAll(): Promise<TeamEntity[]> {
        const teams = await this.teamsService.findAll();
        if (!teams) {
            throw RequestErrorBuilder.throwFormattedGetError('Team', '/teams');
        }
        return teams.map(
            (team: { users: any[]; players: any[] }) =>
                new TeamEntity({
                    ...team,
                    users: team?.users ? team.users.map((user: any) => new UserEntity(user)) : [],
                    players: team.players.map((player: { id: string }) => player.id), // Assuming players should be an array of strings (IDs)
                }),
        );
    }

    @Get(':id')
    @ApiOkResponse({ type: TeamEntity })
    async findOne(@Param('id') id: string): Promise<TeamEntity> {
        const team = await this.teamsService.findOne(id);
        if (!team) {
            throw RequestErrorBuilder.throwFormattedGetError('Team', `/teams/${id}`, `Team with ID ${id} not found.`);
        }
        return new TeamEntity({
            ...team,
            users: team?.users?.map((user: any) => new UserEntity(user)) || [],
            players: team?.players?.map((player: { id: string }) => player.id) || [],
        });
    }

    @Get(':id/players')
    @ApiOkResponse({ type: [PlayerEntity] })
    async findPlayersByTeam(@Param('id') id: string) {
        const team = await this.teamsService.findOne(id);
        if (!team) {
            throw RequestErrorBuilder.throwFormattedGetError('Team', `/teams/${id}`, `Team with ID ${id} not found.`);
        }
        if (!team.players) {
            throw RequestErrorBuilder.throwFormattedGetError(
                'Player',
                `/teams/${id}/players`,
                'No players found for this team.',
            );
        }
        if (team.players.length === 0) {
            // This may be unnecessary depending on the implementation of the frontend
            throw RequestErrorBuilder.throwFormattedGetError(
                'Player',
                `/teams/${id}/players`,
                'No players found for this team.',
            );
        }
        return team.players;
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: TeamEntity })
    async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto): Promise<TeamEntity> {
        const team = await this.teamsService.update(id, updateTeamDto);
        if (!team) {
            throw RequestErrorBuilder.throwFormattedPatchError('Team', `/teams/${id}`, id);
        }
        return new TeamEntity({
            ...team,
            users: team?.users?.map((user: any) => new UserEntity(user)) || [],
            players: team?.players?.map((player: { id: string }) => player.id) || [],
        });
    }

    @Delete(':id')
    @ApiOkResponse({ type: TeamEntity })
    async remove(@Param('id') id: string): Promise<TeamEntity> {
        const team = await this.teamsService.remove(id);
        if (!team) {
            throw RequestErrorBuilder.throwFormattedDeleteError('Team', `/teams/${id}`, id);
        }
        return new TeamEntity({
            ...team,
            users: team?.users?.map((user: any) => new UserEntity(user)) || [],
            players: team?.players?.map((player: { id: string }) => player.id) || [],
        });
    }
}
