import { Injectable } from '@nestjs/common';
import { CreateUsersPhotoDto } from './dto/create-users_photo.dto';
import { UpdateUsersPhotoDto } from './dto/update-users_photo.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UsersPhotosService {
  constructor(private prisma: PrismaService) {}
  create(createUsersPhotoDto: CreateUsersPhotoDto) {
    return 'This action adds a new usersPhoto';
  }

  findAll() {
    return `This action returns all usersPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersPhoto`;
  }

  update(id: number, updateUsersPhotoDto: UpdateUsersPhotoDto) {
    return `This action updates a #${id} usersPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersPhoto`;
  }
}
