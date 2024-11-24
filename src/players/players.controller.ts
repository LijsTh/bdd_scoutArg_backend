import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayerEntity } from './entities/player.entity';

@Controller('players')
@ApiTags('Players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiCreatedResponse({ type: PlayerEntity })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOkResponse({ type: PlayerEntity, isArray: true })
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PlayerEntity })
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PlayerEntity })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PlayerEntity })
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
