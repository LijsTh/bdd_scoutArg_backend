import { Module } from '@nestjs/common';
import { TeamOpinionsCommentsController } from './team-opinions-comments.controller';
import { TeamOpinionsCommentsService } from './team-opinions-comments.service';
import { TeamOpinionsCommentsRepository } from './team-opinions-comments.repository';
import { FirebaseModule } from 'src/database/firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [TeamOpinionsCommentsController],
    providers: [TeamOpinionsCommentsService, TeamOpinionsCommentsRepository],
})
export class TeamOpinionsCommentsModule {}
