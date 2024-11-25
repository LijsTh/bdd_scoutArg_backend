import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreatePlayerCommentDto {
    @ApiProperty({ example: 'user123', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @ApiProperty({
        example: 'opinion123',
        description: 'Player opinion ID to reference.',
    })
    @IsString()
    @IsNotEmpty()
    opinion_team_id: string;

    @ApiProperty({ example: 'Totally agree.', description: 'Comment text' })
    @IsString()
    @IsNotEmpty()
    opinion_text: string;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    created_at: string;
}
