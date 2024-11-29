import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreatePlayerCommentDto {
    user_id?: string;

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
    @IsDate({ message: 'Creation date must be date.' })
    @Type(() => Date)
    created_at: Date;
}
