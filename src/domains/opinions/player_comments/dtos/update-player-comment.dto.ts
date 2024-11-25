import { PartialType } from '@nestjs/swagger';
import { CreatePlayerCommentDto } from './create-player-comment.dto';

export class UpdateTeamOpinionDto extends PartialType(CreatePlayerCommentDto) {}
