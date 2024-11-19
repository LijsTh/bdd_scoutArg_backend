import { players_photos } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PlayersPhotoEntity implements players_photos {
    @ApiProperty()
    player_id: string;
    @ApiProperty()
    photo: Buffer;
    @ApiProperty()
    player: string;
}
