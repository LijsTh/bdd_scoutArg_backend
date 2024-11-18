import { Module } from '@nestjs/common';
import { UsersPhotosService } from './users_photos.service';
import { UsersPhotosController } from './users_photos.controller';

@Module({
  controllers: [UsersPhotosController],
  providers: [UsersPhotosService],
})
export class UsersPhotosModule {}
