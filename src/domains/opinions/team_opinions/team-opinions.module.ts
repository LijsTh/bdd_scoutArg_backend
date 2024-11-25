import { Module } from '@nestjs/common';
import { TeamOpinionsController } from './team-opinions.controller';
import { TeamOpinionsService } from './team-opinions.service';
import { TeamOpinionsRepository } from './team-opinions.repository';
import { FirebaseService } from 'src/database/firebase/firebase.service';
import { FirebaseModule } from 'src/database/firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [TeamOpinionsController],
    providers: [TeamOpinionsService, TeamOpinionsRepository],
})
export class TeamOpinionsModule {}
