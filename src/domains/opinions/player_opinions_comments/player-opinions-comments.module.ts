import { Module } from '@nestjs/common';
import { PlayerOpinionsCommentsController } from './player-opinions-comments.controller';
import { PlayerOpinionsCommentsService } from './player-opinions-comments.service';
import { PlayersOpinionsCommentsRepository } from './player-opinions-comments.repository';
import { FirebaseModule } from 'src/database/firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [PlayerOpinionsCommentsController],
    providers: [PlayerOpinionsCommentsService, PlayersOpinionsCommentsRepository],
})
export class PlayerOpinionsCommentsModule {}
