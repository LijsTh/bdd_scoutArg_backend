import { Module } from '@nestjs/common';
import { TeamsPhotosService } from './teams_photos.service';
import { TeamsPhotosController } from './teams_photos.controller';

@Module({
  controllers: [TeamsPhotosController],
  providers: [TeamsPhotosService],
})
export class TeamsPhotosModule {}
