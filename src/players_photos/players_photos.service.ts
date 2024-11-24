import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayersPhotoDto } from './dto/create-players_photo.dto';
import { UpdatePlayersPhotoDto } from './dto/update-players_photo.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class PlayersPhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlayersPhotoDto: CreatePlayersPhotoDto) {
    const { player_id, photo } = createPlayersPhotoDto;

    return this.prisma.players_photos.create({
      data: {
        player_id,
        photo: Buffer.from(photo, 'base64'),
      },
    });
  }

  async findAll() {
    return this.prisma.players_photos.findMany();
  }

  async findOne(id: string) {
    const playerPhoto = await this.prisma.players_photos.findUnique({
      where: { player_id: id },
    });

    if (!playerPhoto) {
      throw new NotFoundException(`Photo for player with ID ${id} not found`);
    }

    return playerPhoto;
  }

  async update(id: string, updatePlayersPhotoDto: UpdatePlayersPhotoDto) {
    const { photo } = updatePlayersPhotoDto;

    const playerPhoto = await this.prisma.players_photos.findUnique({
      where: { player_id: id },
    });

    if (!playerPhoto) {
      throw new NotFoundException(`Photo for player with ID ${id} not found`);
    }

    return this.prisma.players_photos.update({
      where: { player_id: id },
      data: { photo: photo ? Buffer.from(photo, 'base64') : undefined },
    });
  }

  async remove(id: string) {
    const playerPhoto = await this.prisma.players_photos.findUnique({
      where: { player_id: id },
    });

    if (!playerPhoto) {
      throw new NotFoundException(`Photo for player with ID ${id} not found`);
    }

    return this.prisma.players_photos.delete({
      where: { player_id: id },
    });
  }
}
