import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersPhotosService } from './players_photos.service';
import { CreatePlayersPhotoDto } from './dto/create-players_photo.dto';
import { UpdatePlayersPhotoDto } from './dto/update-players_photo.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayersPhotoEntity } from './entities/players_photo.entity';

@Controller('players-photos')
@ApiTags('PlayersPhotos')
export class PlayersPhotosController {
  constructor(private readonly playersPhotosService: PlayersPhotosService) {}

  @Post()
  @ApiCreatedResponse({ type: PlayersPhotoEntity })
  create(@Body() createPlayersPhotoDto: CreatePlayersPhotoDto) {
    return this.playersPhotosService.create(createPlayersPhotoDto);
  }

  @Get()
  @ApiOkResponse({ type: PlayersPhotoEntity, isArray: true })
  findAll() {
    return this.playersPhotosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PlayersPhotoEntity })
  findOne(@Param('id') id: string) {
    return this.playersPhotosService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PlayersPhotoEntity })
  update(
    @Param('id') id: string,
    @Body() updatePlayersPhotoDto: UpdatePlayersPhotoDto,
  ) {
    return this.playersPhotosService.update(id, updatePlayersPhotoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PlayersPhotoEntity })
  remove(@Param('id') id: string) {
    return this.playersPhotosService.remove(id);
  }
}
