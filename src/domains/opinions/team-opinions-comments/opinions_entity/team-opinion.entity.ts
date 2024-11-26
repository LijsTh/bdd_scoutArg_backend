import { ApiProperty } from '@nestjs/swagger';

export class TeamOpinionEntity {
    @ApiProperty({ example: 'user123', description: 'User ID' })
    user_id: string;

    @ApiProperty({ example: 'team123', description: 'Team ID' })
    team_id: string;

    @ApiProperty({
        example: 'Team with great defense.',
        description: 'Opinion text',
    })
    opinion_text: string;

    @ApiProperty({ example: 5, description: 'Team rating (1-5 stars)' })
    rating: number;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    created_at: string;
}
