import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreatePlayerCommentDto {
    user_id?: string;
    player_opinion_id: string;

    @ApiProperty({ example: 'Totally agree.', description: 'Comment text' })
    @IsNotEmpty({ message: 'Comment text is required.' })
    @IsString({ message: 'Comment text must be a string.' })
    comment_text: string;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    @IsNotEmpty({ message: 'Creation date is required.' })
    @IsDate({ message: 'Creation date must be date.' })
    @Type(() => Date)
    created_at: Date;
}
