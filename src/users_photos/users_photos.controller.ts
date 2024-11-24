import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersPhotosService } from './users_photos.service';
import { CreateUsersPhotoDto } from './dto/create-users_photo.dto';
import { UpdateUsersPhotoDto } from './dto/update-users_photo.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersPhotoEntity } from './entities/users_photo.entity';

@Controller('users-photos')
@ApiTags('UsersPhotos')
export class UsersPhotosController {
  constructor(private readonly usersPhotosService: UsersPhotosService) {}

  @Post()
  @ApiCreatedResponse({ type: UsersPhotoEntity })
  create(@Body() createUsersPhotoDto: CreateUsersPhotoDto) {
    return this.usersPhotosService.create(createUsersPhotoDto);
  }

  @Get()
  @ApiOkResponse({ type: UsersPhotoEntity, isArray: true })
  findAll() {
    return this.usersPhotosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UsersPhotoEntity })
  findOne(@Param('id') id: string) {
    return this.usersPhotosService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UsersPhotoEntity })
  update(
    @Param('id') id: string,
    @Body() updateUsersPhotoDto: UpdateUsersPhotoDto,
  ) {
    return this.usersPhotosService.update(id, updateUsersPhotoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UsersPhotoEntity })
  remove(@Param('id') id: string) {
    return this.usersPhotosService.remove(id);
  }
}
