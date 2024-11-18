import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersPhotosService } from './users_photos.service';
import { CreateUsersPhotoDto } from './dto/create-users_photo.dto';
import { UpdateUsersPhotoDto } from './dto/update-users_photo.dto';

@Controller('users-photos')
export class UsersPhotosController {
  constructor(private readonly usersPhotosService: UsersPhotosService) {}

  @Post()
  create(@Body() createUsersPhotoDto: CreateUsersPhotoDto) {
    return this.usersPhotosService.create(createUsersPhotoDto);
  }

  @Get()
  findAll() {
    return this.usersPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersPhotoDto: UpdateUsersPhotoDto) {
    return this.usersPhotosService.update(+id, updateUsersPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersPhotosService.remove(+id);
  }
}
