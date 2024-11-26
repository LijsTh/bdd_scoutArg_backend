import { PartialType } from '@nestjs/swagger';
import { CreateTeamCommentDto } from './create-team-comment.dto';

export class UpdateTeamOpinionDto extends PartialType(CreateTeamCommentDto) {}
