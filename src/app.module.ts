import { Module } from '@nestjs/common';
import { FirebaseModule } from './database/firebase/firebase.module';
import { PlayersModule } from './domains/players/players.module';
import { TeamsModule } from './domains/teams/teams.module';
import { UsersModule } from './domains/users/users.module';
import { TeamOpinionsCommentsModule } from './domains/opinions/team-opinions-comments/team-opinions-comments.module';
import { PlayerOpinionsCommentsModule } from './domains/opinions/player-opinions-comments/player-opinions-comments.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
    imports: [UsersModule, PlayersModule, TeamsModule, TeamOpinionsCommentsModule, PlayerOpinionsCommentsModule],
    providers: [FirebaseModule, PrismaModule],
})
export class AppModule {}
