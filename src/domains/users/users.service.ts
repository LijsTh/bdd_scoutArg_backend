import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../database/prisma/prisma.service';

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
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        team: true, // Incluye los detalles del equipo si existe
      },
    });
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
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
