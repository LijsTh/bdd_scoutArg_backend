import { teams } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TeamEntity implements teams {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty( { required: false, nullable: true })
    photo?: string;
    @ApiProperty()
    users: string[];
    @ApiProperty()
    players: string[];
}
