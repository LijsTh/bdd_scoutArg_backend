import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class PlayersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createPlayerDto: CreatePlayerDto) {
        return this.prisma.players.create({
            data: {
                name: createPlayerDto.name,
                age: createPlayerDto.age,
                position: createPlayerDto.position,
                number: createPlayerDto.number,
                team_id: createPlayerDto.team_id ?? null, // Si no tiene equipo, asigna null
            },
        });
    }

    async findAll() {
        return this.prisma.players.findMany({
            include: {
                team: true, // Incluye el equipo asociado si existe
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.players.findUnique({
            where: {
                id,
            },
            include: {
                team: true, // Incluye el equipo asociado si existe
            },
        });
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        return this.prisma.players.update({
            where: {
                id,
            },
            data: {
                name: updatePlayerDto.name,
                age: updatePlayerDto.age,
                position: updatePlayerDto.position,
                number: updatePlayerDto.number,
                team_id: updatePlayerDto.team_id ?? null, // Si no tiene equipo, asigna null
            },
        });
    }

    async remove(id: string) {
        return this.prisma.players.delete({
            where: {
                id,
            },
        });
    }
}
