import { Module } from '@nestjs/common';
import { PlayersPhotosService } from './players_photos.service';
import { PlayersPhotosController } from './players_photos.controller';
import { PrismaModule } from '../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlayersPhotosController],
  providers: [PlayersPhotosService],
})
export class PlayersPhotosModule {}
