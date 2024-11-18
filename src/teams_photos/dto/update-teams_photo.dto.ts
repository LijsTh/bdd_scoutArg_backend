import { PartialType } from '@nestjs/swagger';
import { CreateTeamsPhotoDto } from './create-teams_photo.dto';

export class UpdateTeamsPhotoDto extends PartialType(CreateTeamsPhotoDto) {}
