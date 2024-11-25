import { Module } from '@nestjs/common';
import { PlayersModule } from './domains/players/players.module';
import { TeamsModule } from './domains/teams/teams.module';
import { UsersModule } from './domains/users/users.module';

@Module({
  imports: [
    UsersModule,
    PlayersModule,
    TeamsModule,
  ],
})
export class AppModule {}
