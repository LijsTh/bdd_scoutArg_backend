import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamsPhotosService } from './teams_photos.service';
import { CreateTeamsPhotoDto } from './dto/create-teams_photo.dto';
import { UpdateTeamsPhotoDto } from './dto/update-teams_photo.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamsPhotoEntity } from './entities/teams_photo.entity';


@Controller('teams-photos')
@ApiTags('TeamsPhotos')
export class TeamsPhotosController {
  constructor(private readonly teamsPhotosService: TeamsPhotosService) {}

  @Post()
  @ApiCreatedResponse({ type: TeamsPhotoEntity })
  create(@Body() createTeamsPhotoDto: CreateTeamsPhotoDto) {
    return this.teamsPhotosService.create(createTeamsPhotoDto);
  }

  @Get()
  @ApiOkResponse({ type: TeamsPhotoEntity, isArray: true })
  findAll() {
    return this.teamsPhotosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TeamsPhotoEntity })
  findOne(@Param('id') id: string) {
    return this.teamsPhotosService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TeamsPhotoEntity })
  update(@Param('id') id: string, @Body() updateTeamsPhotoDto: UpdateTeamsPhotoDto) {
    return this.teamsPhotosService.update(id, updateTeamsPhotoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TeamsPhotoEntity })
  remove(@Param('id') id: string) {
    return this.teamsPhotosService.remove(id);
  }
}
