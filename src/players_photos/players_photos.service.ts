import { Injectable } from '@nestjs/common';
import { CreatePlayersPhotoDto } from './dto/create-players_photo.dto';
import { UpdatePlayersPhotoDto } from './dto/update-players_photo.dto';

@Injectable()
export class PlayersPhotosService {
  create(createPlayersPhotoDto: CreatePlayersPhotoDto) {
    return 'This action adds a new playersPhoto';
  }

  findAll() {
    return `This action returns all playersPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playersPhoto`;
  }

  update(id: number, updatePlayersPhotoDto: UpdatePlayersPhotoDto) {
    return `This action updates a #${id} playersPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} playersPhoto`;
  }
}
