import { ApiProperty } from '@nestjs/swagger';

export class PlayerOpinionEntity {
    @ApiProperty({ example: 'user123', description: 'User ID' })
    user_id: string;

    @ApiProperty({ example: 'player123', description: 'Player ID' })
    player_id: string;

    @ApiProperty({
        example: 'Player with great technique.',
        description: 'Opinion text',
    })
    opinion_text: string;

    @ApiProperty({ example: 5, description: 'Player rating (1-5 stars)' })
    rating: number;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    created_at: string;
}
