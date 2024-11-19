import { Injectable } from '@nestjs/common';
import { CreateTeamsPhotoDto } from './dto/create-teams_photo.dto';
import { UpdateTeamsPhotoDto } from './dto/update-teams_photo.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class TeamsPhotosService {
  constructor(private prisma: PrismaService) {}
  create(createTeamsPhotoDto: CreateTeamsPhotoDto) {
    return 'This action adds a new teamsPhoto';
  }

  findAll() {
    return `This action returns all teamsPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamsPhoto`;
  }

  update(id: number, updateTeamsPhotoDto: UpdateTeamsPhotoDto) {
    return `This action updates a #${id} teamsPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamsPhoto`;
  }
}
