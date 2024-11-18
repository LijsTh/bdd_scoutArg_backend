import { Module } from '@nestjs/common';
import { PlayersPhotosService } from './players_photos.service';
import { PlayersPhotosController } from './players_photos.controller';

@Module({
  controllers: [PlayersPhotosController],
  providers: [PlayersPhotosService],
})
export class PlayersPhotosModule {}
