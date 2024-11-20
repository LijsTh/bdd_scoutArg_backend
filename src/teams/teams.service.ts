import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    return this.prisma.teams.create({
      data: {
        name: createTeamDto.name,
        photo: createTeamDto.photo ? { create: { photo: Buffer.from(createTeamDto.photo, 'base64') } } : undefined, // Crea la foto si está presente
      },
    });
  }

  async findAll() {
    return this.prisma.teams.findMany({
      include: {
        photo: true, // Incluye la foto del equipo si existe
        users: true, // Incluye los usuarios asociados
        players: true, // Incluye los jugadores asociados
      },
    });
  }

  async findOne(id: string) {
    const team = await this.prisma.teams.findUnique({
      where: { id },
      include: {
        photo: true, // Incluye la foto si existe
        users: true, // Incluye los usuarios asociados
        players: true, // Incluye los jugadores asociados
      },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async findPlayersByTeamId(teamId: string) {
    return this.prisma.teams.findUnique({
      where: { id: teamId },
      select: {
        players: true,  // Seleccionamos los jugadores relacionados con el equipo
      },
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.prisma.teams.update({
      where: { id },
      data: {
        name: updateTeamDto.name,
        photo: updateTeamDto.photo
          ? {
              upsert: {
                create: { photo: Buffer.from(updateTeamDto.photo, 'base64') }, // Si no existe, crea una nueva
                update: { photo: Buffer.from(updateTeamDto.photo, 'base64') }, // Si existe, actualiza la foto
              },
            }
          : undefined, // Si no hay foto, no hacer cambios
      },
    });
  }

  async remove(id: string) {
    const team = await this.prisma.teams.findUnique({ where: { id } });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return this.prisma.teams.delete({
      where: { id },
    });
  }
}