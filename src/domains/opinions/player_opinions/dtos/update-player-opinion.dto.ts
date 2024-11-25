import { PartialType } from '@nestjs/swagger';
import { CreatePlayerOpinionDto } from './create-player-opinion.dto';

export class UpdateTeamOpinionDto extends PartialType(CreatePlayerOpinionDto) {}
