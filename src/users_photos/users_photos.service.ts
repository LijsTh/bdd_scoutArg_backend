import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersPhotoDto } from './dto/create-users_photo.dto';
import { UpdateUsersPhotoDto } from './dto/update-users_photo.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UsersPhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsersPhotoDto: CreateUsersPhotoDto) {
    const { user_id, photo } = createUsersPhotoDto;

    return this.prisma.users_photos.create({
      data: {
        user_id,
        photo: Buffer.from(photo, 'base64'),
      },
    });
  }

  async findAll() {
    return this.prisma.users_photos.findMany();
  }

  async findOne(id: string) {
    const userPhoto = await this.prisma.users_photos.findUnique({
      where: { user_id: id },
    });

    if (!userPhoto) {
      throw new NotFoundException(`Photo for user with ID ${id} not found`);
    }

    return userPhoto;
  }

  async update(id: string, updateUsersPhotoDto: UpdateUsersPhotoDto) {
    const { photo } = updateUsersPhotoDto;

    const userPhoto = await this.prisma.users_photos.findUnique({
      where: { user_id: id },
    });

    if (!userPhoto) {
      throw new NotFoundException(`Photo for user with ID ${id} not found`);
    }

    return this.prisma.users_photos.update({
      where: { user_id: id },
      data: { photo: photo ? Buffer.from(photo, 'base64') : undefined },
    });
  }

  async remove(id: string) {
    const userPhoto = await this.prisma.users_photos.findUnique({
      where: { user_id: id },
    });

    if (!userPhoto) {
      throw new NotFoundException(`Photo for user with ID ${id} not found`);
    }

    return this.prisma.users_photos.delete({
      where: { user_id: id },
    });
  }
}