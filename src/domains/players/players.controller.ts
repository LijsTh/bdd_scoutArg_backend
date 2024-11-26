import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayerEntity } from './entities/player.entity';
import { RequestErrorBuilder } from 'src/utils/exceptions/http-exception/request-error-builder';

@Controller('players')
@ApiTags('Players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @ApiCreatedResponse({ type: PlayerEntity })
    async create(@Body() createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
        const player = await this.playersService.create(createPlayerDto);
        if (!player) {
            throw RequestErrorBuilder.throwFormattedPostError('Player');
        }
        return player;
    }

    @Get()
    @ApiOkResponse({ type: PlayerEntity, isArray: true })
    async findAll(): Promise<PlayerEntity[]> {
        const players = await this.playersService.findAll();
        if (!players) {
            throw RequestErrorBuilder.throwFormattedGetError('Player', '/players');
        }
        return players;
    }

    @Get(':id')
    @ApiOkResponse({ type: PlayerEntity })
    async findOne(@Param('id') id: string): Promise<PlayerEntity> {
        const player = await this.playersService.findOne(id);
        if (!player) {
            throw RequestErrorBuilder.throwFormattedGetError(
                'Player',
                `/players/${id}`,
                `Player with ID ${id} not found.`,
            );
        }
        return player;
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: PlayerEntity })
    async update(
        @Param('id') id: string,
        @Body()
        updatePlayerDto: UpdatePlayerDto,
    ): Promise<PlayerEntity> {
        const player = await this.playersService.update(id, updatePlayerDto);
        if (!player) {
            throw RequestErrorBuilder.throwFormattedPatchError('Player', `/players/${id}`, id);
        }
        return player;
    }

    @Delete(':id')
    @ApiOkResponse({ type: PlayerEntity })
    async remove(@Param('id') id: string): Promise<PlayerEntity> {
        const player = await this.playersService.remove(id);
        if (!player) {
            throw RequestErrorBuilder.throwFormattedDeleteError('Player', `/players/${id}`, id);
        }
        return player;
    }
}
