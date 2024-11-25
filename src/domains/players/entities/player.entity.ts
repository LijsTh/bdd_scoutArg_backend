import { players } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerEntity implements players {
    @ApiProperty( {example: 'player123', description: 'Player ID'} )
    id: string;
    @ApiProperty( {example: 'Player name', description: 'Player name'} )
    name: string;
    @ApiProperty( {example: 25, description: 'Player age'} )
    age: number;
    @ApiProperty( {example: 'Forward', description: 'Player position'} )
    position: string;
    @ApiProperty( {example: 10, description: 'Player number'} )
    number: number;
    @ApiProperty({ required: false, nullable: true, example: 'team123', description: 'Team ID' })
    team_id: string | null;
    @ApiProperty({ required: false, nullable: true })
    team?: { id: string; name: string } | null;
}
