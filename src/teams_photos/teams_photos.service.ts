import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamsPhotoDto } from './dto/create-teams_photo.dto';
import { UpdateTeamsPhotoDto } from './dto/update-teams_photo.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class TeamsPhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamsPhotoDto: CreateTeamsPhotoDto) {
    const { team_id, photo } = createTeamsPhotoDto;

    return this.prisma.teams_photos.create({
      data: {
        team_id,
        photo: Buffer.from(photo, 'base64'),
      },
    });
  }

  async findAll() {
    return this.prisma.teams_photos.findMany();
  }

  async findOne(id: string) {
    const teamPhoto = await this.prisma.teams_photos.findUnique({
      where: { team_id: id },
    });

    if (!teamPhoto) {
      throw new NotFoundException(`Photo for team with ID ${id} not found`);
    }

    return teamPhoto;
  }

  async update(id: string, updateTeamsPhotoDto: UpdateTeamsPhotoDto) {
    const { photo } = updateTeamsPhotoDto;

    const teamPhoto = await this.prisma.teams_photos.findUnique({
      where: { team_id: id },
    });

    if (!teamPhoto) {
      throw new NotFoundException(`Photo for team with ID ${id} not found`);
    }

    return this.prisma.teams_photos.update({
      where: { team_id: id },
      data: { photo: photo ? Buffer.from(photo, 'base64') : undefined },
    });
  }

  async remove(id: string) {
    const teamPhoto = await this.prisma.teams_photos.findUnique({
      where: { team_id: id },
    });

    if (!teamPhoto) {
      throw new NotFoundException(`Photo for team with ID ${id} not found`);
    }

    return this.prisma.teams_photos.delete({
      where: { team_id: id },
    });
  }
}
