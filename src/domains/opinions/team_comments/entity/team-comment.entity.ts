import { ApiProperty } from '@nestjs/swagger';

export class TeamComment {
    @ApiProperty({ example: 'user123', description: 'User ID' })
    user_id: string;

    @ApiProperty({ example: 'team123', description: 'Team ID' })
    team_opinion_id: string;

    @ApiProperty({ example: 'Totally agree.', description: 'Comment text' })
    comment_text: string;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    created_at: string;
}
