import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamEntity } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class TeamsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createTeamDto: CreateTeamDto): Promise<TeamEntity> {
        const team = await this.prisma.teams.create({
            data: createTeamDto,
            include: {
                users: true,
                players: true,
            },
        });
        return new TeamEntity({
            ...team,
            players: team.players ? team.players.map((player) => player.id) : [],
        });
    }

    async findAll(): Promise<TeamEntity[]> {
        const teams = await this.prisma.teams.findMany({
            include: {
                users: true,
                players: true,
            },
        });
        return teams.map(
            (team) =>
                new TeamEntity({
                    ...team,
                    users: team.users ? team.users.map((user) => new UserEntity(user)) : [],
                    players: team.players ? team.players.map((player) => player.id) : [],
                }),
        );
    }

    async findOne(id: string): Promise<TeamEntity> {
        const team = await this.prisma.teams.findUnique({
            where: {
                id,
            },
            include: {
                users: true,
                players: true,
            },
        });
        if (!team) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }
        return new TeamEntity({
            ...team,
            users: team.users ? team.users.map((user) => new UserEntity(user)) : [],
            players: team.players ? team.players.map((player) => player.id) : [],
        });
    }

    async findPlayersByTeamId(teamId: string): Promise<string[]> {
        const team = await this.prisma.teams.findUnique({
            where: {
                id: teamId,
            },
            include: {
                players: true,
            },
        });
        if (!team) {
            throw new NotFoundException(`Team with id ${teamId} not found`);
        }
        return team.players ? team.players.map((player) => player.id) : [];
    }

    async findUsersByTeamId(teamId: string): Promise<number> {
        const team = await this.prisma.teams.findUnique({
            where: {
                id: teamId,
            },
            include: {
                users: true,
            },
        });
        if (!team) {
            throw new NotFoundException(`Team with id ${teamId} not found`);
        }
        return team.users ? team.users.length : 0;
    }

    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<TeamEntity> {
        const team = await this.prisma.teams.update({
            where: {
                id,
            },
            data: updateTeamDto,
            include: {
                users: true,
                players: true,
            },
        });
        if (!team) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }
        return new TeamEntity({
            ...team,
            users: team.users ? team.users.map((user) => new UserEntity(user)) : [],
            players: team.players ? team.players.map((player) => player.id) : [],
        });
    }

    async remove(id: string): Promise<TeamEntity> {
        const teamDeleted = await this.prisma.teams.delete({
            where: {
                id,
            },
            include: {
                users: true,
                players: true,
            },
        });
        if (!teamDeleted) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }
        return new TeamEntity({
            ...teamDeleted,
            users: teamDeleted.users ? teamDeleted.users.map((user) => new UserEntity(user)) : [],
            players: teamDeleted.players ? teamDeleted.players.map((player) => player.id) : [],
        });
    }
}
