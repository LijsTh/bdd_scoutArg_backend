import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { TeamsPhotosModule } from './teams_photos/teams_photos.module';
import { UsersPhotosModule } from './users_photos/users_photos.module';
import { PlayersPhotosModule } from './players_photos/players_photos.module';

@Module({
  imports: [UsersModule, PlayersModule, TeamsModule, TeamsPhotosModule, UsersPhotosModule, PlayersPhotosModule],
})
export class AppModule {}
