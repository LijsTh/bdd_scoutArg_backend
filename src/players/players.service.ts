import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../database/prisma/prisma.service';

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
        photo: createPlayerDto.photo ? { create: { photo: Buffer.from(createPlayerDto.photo, 'base64') } } : undefined, // Crea la foto si está presente
      },
    });
  }

  async findAll() {
    return this.prisma.players.findMany({
      include: {
        photo: true, // Incluye la foto del jugador si existe
        team: true, // Incluye el equipo asociado si existe
      },
    });
  }

  async findOne(id: string) {
    const player = await this.prisma.players.findUnique({
      where: { id },
      include: {
        photo: true, // Incluye la foto si existe
        team: true, // Incluye el equipo asociado si existe
      },
    });

    if (!player) {
      throw new Error(`Player with ID ${id} not found`);
    }

    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.players.update({
      where: { id },
      data: {
        name: updatePlayerDto.name,
        age: updatePlayerDto.age,
        position: updatePlayerDto.position,
        number: updatePlayerDto.number,
        team_id: updatePlayerDto.team_id ?? null, // Si no tiene equipo, asigna null
        photo: updatePlayerDto.photo
          ? {
              upsert: {
                create: { photo: Buffer.from(updatePlayerDto.photo, 'base64') }, // Si no existe, crea una nueva
                update: { photo: Buffer.from(updatePlayerDto.photo, 'base64') }, // Si existe, actualiza la foto
              },
            }
          : undefined, // Si no hay foto, no hacer cambios
      },
    });
  }

  async remove(id: string) {
    const player = await this.prisma.players.findUnique({ where: { id } });

    if (!player) {
      throw new Error(`Player with ID ${id} not found`);
    }

    return this.prisma.players.delete({
      where: { id },
    });
  }
}