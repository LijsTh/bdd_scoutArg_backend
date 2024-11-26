import { Module } from '@nestjs/common';
import { TeamOpinionsCommentsController } from './team-opinions-comments.controller';
import { TeamOpinionsCommentsService } from './team-opinions-comments.service';
import { TeamOpinionsCommentsRepository } from './team-opinions-comments.repository';
import { FirebaseModule } from 'src/database/firebase/firebase.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
    imports: [FirebaseModule, PrismaModule],
    controllers: [TeamOpinionsCommentsController],
    providers: [TeamOpinionsCommentsService, TeamOpinionsCommentsRepository],
})
export class TeamOpinionsCommentsModule {}
