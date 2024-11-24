import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        team_id: createUserDto.team_id ?? null, // Si no tiene equipo, se asigna null
      },
    });
  }

  async findAll() {
    return this.prisma.users.findMany({
      include: {
        team: true, // Incluye los detalles del equipo si existe
        photo: true, // Incluye la foto si existe
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        team: true, // Incluye el equipo si existe
        photo: true, // Incluye la foto si existe
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password,
        team_id: updateUserDto.team_id ?? null, // Si no tiene equipo, se asigna null
      },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.users.delete({
      where: { id },
    });
  }
}
