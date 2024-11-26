import { Module } from '@nestjs/common';
import { FirebaseModule } from './database/firebase/firebase.module';
import { PlayersModule } from './domains/players/players.module';
import { TeamsModule } from './domains/teams/teams.module';
import { UsersModule } from './domains/users/users.module';
import { TeamOpinionsCommentsModule } from './domains/opinions/team_opinions_comments/team-opinions-comments.module';
import { PlayerOpinionsCommentsModule } from './domains/opinions/player_opinions_comments/player-opinions-comments.module';

@Module({
    imports: [
        UsersModule,
        PlayersModule,
        TeamsModule,
        FirebaseModule,
        TeamOpinionsCommentsModule,
        PlayerOpinionsCommentsModule,
    ],
    providers: [FirebaseModule],
})
export class AppModule {}
