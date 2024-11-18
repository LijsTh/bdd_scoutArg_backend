import { PartialType } from '@nestjs/swagger';
import { CreatePlayersPhotoDto } from './create-players_photo.dto';

export class UpdatePlayersPhotoDto extends PartialType(CreatePlayersPhotoDto) {}
