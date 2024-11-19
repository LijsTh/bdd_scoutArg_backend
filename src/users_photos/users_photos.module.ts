import { Module } from '@nestjs/common';
import { UsersPhotosService } from './users_photos.service';
import { UsersPhotosController } from './users_photos.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersPhotosController],
  providers: [UsersPhotosService],
})
export class UsersPhotosModule {}
