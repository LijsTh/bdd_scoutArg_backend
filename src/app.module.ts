import { Module } from '@nestjs/common';
import { PlayersModule } from './domains/players/players.module';
import { TeamsModule } from './domains/teams/teams.module';
import { UsersModule } from './domains/users/users.module';
import { TeamOpinionsModule } from './domains/opinions/team_opinions/team-opinions.module';
import { FirebaseModule } from './database/firebase/firebase.module';

@Module({
    imports: [UsersModule, PlayersModule, TeamsModule, FirebaseModule, TeamOpinionsModule],
    providers: [FirebaseModule],
})
export class AppModule {}
