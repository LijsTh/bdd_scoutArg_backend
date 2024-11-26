import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlayerCommentDto {
    @ApiProperty({ example: 'user123', description: 'User ID' })
    @IsNotEmpty({ message: 'User ID is required.' })
    @IsString({ message: 'User ID must be a string.' })
    user_id: string;

    @ApiProperty({
        example: 'opinion123',
        description: 'Player opinion ID to reference.',
    })
    @IsNotEmpty({ message: 'Player opinion ID is required.' })
    @IsString({ message: 'Player opinion ID must be a string.' })
    player_opinion_id: string;

    @ApiProperty({ example: 'Totally agree.', description: 'Comment text' })
    @IsNotEmpty({ message: 'Comment text is required.' })
    @IsString({ message: 'Comment text must be a string.' })
    opinion_text: string;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    @IsNotEmpty({ message: 'Creation date is required.' })
    @IsString({ message: 'Creation date must be a string.' })
    created_at: string;
}
