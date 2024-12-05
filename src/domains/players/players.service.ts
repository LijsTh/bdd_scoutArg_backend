import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PlayerOpinionsCommentsService } from '../opinions/player-opinions-comments/player-opinions-comments.service';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
export class PlayersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly opinions: PlayerOpinionsCommentsService,
    ) {}

    async create(createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
        return await this.prisma.players.create({
            data: {
                name: createPlayerDto.name,
                age: createPlayerDto.age,
                position: createPlayerDto.position,
                number: createPlayerDto.number,
                team_id: createPlayerDto.team_id ?? null,
            },
        });
    }

    async findAll(): Promise<PlayerEntity[]> {
        return await this.prisma.players.findMany({
            include: {
                team: true,
            },
        });
    }

    async findOne(id: string): Promise<PlayerEntity> {
        const player = await this.prisma.players.findUnique({
            where: {
                id,
            },
            include: {
                team: true,
            },
        });
        if (!player) {
            throw new NotFoundException(`Player with id ${id} not found`);
        }
        return player;
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        const player = await this.prisma.players.update({
            where: {
                id,
            },
            data: {
                name: updatePlayerDto.name,
                age: updatePlayerDto.age,
                position: updatePlayerDto.position,
                number: updatePlayerDto.number,
                team_id: updatePlayerDto.team_id ?? null,
            },
        });
        if (!player) {
            throw new NotFoundException(`Player with id ${id} not found`);
        }
        return player;
    }

    async remove(id: string) {
        const exists = await this.prisma.players.findUnique({
            where: {
                id,
            },
        });

        if (!exists) {
            throw new NotFoundException(`Player with id ${id} not found`);
        }

        await this.opinions.deleteOpinionsByPlayerId(id);

        const playerDeleted = await this.prisma.players.delete({
            where: {
                id,
            },
        });
        if (!playerDeleted) {
            throw new NotFoundException(`Player with id ${id} not found`);
        }

        // Delete all comments for this player

        return playerDeleted;
    }
}
