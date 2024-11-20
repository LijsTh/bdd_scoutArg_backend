import { teams_photos } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TeamsPhotoEntity implements teams_photos {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    team_id: string;

    @ApiProperty()
    photo: Buffer;
}
