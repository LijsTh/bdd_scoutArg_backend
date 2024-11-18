import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamsPhotosService } from './teams_photos.service';
import { CreateTeamsPhotoDto } from './dto/create-teams_photo.dto';
import { UpdateTeamsPhotoDto } from './dto/update-teams_photo.dto';

@Controller('teams-photos')
export class TeamsPhotosController {
  constructor(private readonly teamsPhotosService: TeamsPhotosService) {}

  @Post()
  create(@Body() createTeamsPhotoDto: CreateTeamsPhotoDto) {
    return this.teamsPhotosService.create(createTeamsPhotoDto);
  }

  @Get()
  findAll() {
    return this.teamsPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamsPhotoDto: UpdateTeamsPhotoDto) {
    return this.teamsPhotosService.update(+id, updateTeamsPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsPhotosService.remove(+id);
  }
}
