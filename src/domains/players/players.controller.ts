import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiResponse,
} from '@nestjs/swagger';
import { PlayerEntity } from './entities/player.entity';
import { createFormattedError } from 'src/utils/exceptions/http-exception/formatted-exeption';
import { Prisma } from '@prisma/client';

@Controller('players')
@ApiTags('Players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @ApiCreatedResponse({ type: PlayerEntity })
    @ApiBearerAuth()
    async create(@Body() createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
        try {
            return await this.playersService.create(createPlayerDto);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError('Error creating Player', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get()
    @ApiOkResponse({ type: PlayerEntity, isArray: true })
    async findAll(): Promise<PlayerEntity[]> {
        try {
            return await this.playersService.findAll();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError('Error obtaining Players', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get('/without-team')
    @ApiResponse({ status: 198, type: PlayerEntity, isArray: true })
    @ApiBearerAuth()
    async getPlayersWithoutTeam(): Promise<PlayerEntity[]> {
        try {
            return await this.playersService.getPlayersWithoutTeam();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError('Error obtaining Players without team', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get(':id')
    @ApiOkResponse({ type: PlayerEntity })
    async findOne(@Param('id') id: string): Promise<PlayerEntity> {
        try {
            return await this.playersService.findOne(id);
        } catch (error) {
            const title = 'Error obtaining Player';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: PlayerEntity })
    @ApiBearerAuth()
    async update(
        @Param('id') id: string,
        @Body()
        updatePlayerDto: UpdatePlayerDto,
    ): Promise<PlayerEntity> {
        try {
            return await this.playersService.update(id, updatePlayerDto);
        } catch (error) {
            const title = 'Error updating Player';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Delete(':id')
    @ApiNoContentResponse({ description: 'Player deleted' })
    @ApiBearerAuth()
    async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
        try {
            await this.playersService.remove(id);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            const title = 'Error deleting Player';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
}
