import { Module } from '@nestjs/common';
import { TeamsPhotosService } from './teams_photos.service';
import { TeamsPhotosController } from './teams_photos.controller';
import { PrismaModule } from '../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeamsPhotosController],
  providers: [TeamsPhotosService],
})
export class TeamsPhotosModule {}
