import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayersPhotosService } from './players_photos.service';
import { CreatePlayersPhotoDto } from './dto/create-players_photo.dto';
import { UpdatePlayersPhotoDto } from './dto/update-players_photo.dto';

@Controller('players-photos')
export class PlayersPhotosController {
  constructor(private readonly playersPhotosService: PlayersPhotosService) {}

  @Post()
  create(@Body() createPlayersPhotoDto: CreatePlayersPhotoDto) {
    return this.playersPhotosService.create(createPlayersPhotoDto);
  }

  @Get()
  findAll() {
    return this.playersPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayersPhotoDto: UpdatePlayersPhotoDto) {
    return this.playersPhotosService.update(+id, updatePlayersPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersPhotosService.remove(+id);
  }
}
