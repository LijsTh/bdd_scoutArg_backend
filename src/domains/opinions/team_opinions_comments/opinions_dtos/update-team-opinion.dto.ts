import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTeamOpinionDto } from './create-team-opinion.dto';

export class UpdateTeamOpinionDto extends PartialType(CreateTeamOpinionDto) {}
