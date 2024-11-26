import { PartialType } from '@nestjs/swagger';
import { CreatePlayerOpinionDto } from './create-player-opinion.dto';

export class UpdatePlayerOpinionDto extends PartialType(CreatePlayerOpinionDto) {}
