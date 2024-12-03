import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TeamEntity } from './entities/team.entity';
import { PlayerEntity } from '../players/entities/player.entity';
import { createFormattedError } from 'src/utils/exceptions/http-exception/formatted-exeption';
import { Prisma } from '@prisma/client';

@Controller('teams')
@ApiTags('Teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    @ApiCreatedResponse({ type: TeamEntity })
    @ApiBearerAuth()
    async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamEntity> {
        try {
            return new TeamEntity(await this.teamsService.create(createTeamDto));
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError('Error creating Team', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get()
    @ApiOkResponse({ type: TeamEntity, isArray: true })
    async findAll(): Promise<TeamEntity[]> {
        try {
            return await this.teamsService.findAll();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError('Error obtaining Teams', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get(':id')
    @ApiOkResponse({ type: TeamEntity })
    async findOne(@Param('id') id: string): Promise<TeamEntity> {
        try {
            return await this.teamsService.findOne(id);
        } catch (error) {
            const title = 'Error obtaining Team';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get(':id/players')
    @ApiOkResponse({ type: [PlayerEntity] })
    async findPlayersByTeam(@Param('id') id: string): Promise<string[]> {
        try {
            return await this.teamsService.findPlayersByTeamId(id);
        } catch (error) {
            const title = 'Error obtaining Players by Team ID';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get(':id/users')
    @ApiOkResponse({ type: Number })
    async findUsersByTeam(@Param('id') id: string): Promise<number> {
        try {
            return await this.teamsService.findUsersByTeamId(id);
        } catch (error) {
            const title = 'Error obtaining Users by Team ID';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: TeamEntity })
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto): Promise<TeamEntity> {
        try {
            return new TeamEntity(await this.teamsService.update(id, updateTeamDto));
        } catch (error) {
            const title = 'Error updating Team';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Delete(':id')
    @ApiNoContentResponse({ description: 'Team deleted' })
    @ApiBearerAuth()
    async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
        try {
            await this.teamsService.remove(id);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            const title = 'Error deleting Team';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
}
