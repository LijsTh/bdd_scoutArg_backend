import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTeamCommentDto {
    user_id?: string;
    opinion_team_id: string;

    @ApiProperty({ example: 'Totally agree.', description: 'Comment text' })
    @IsString()
    @IsNotEmpty()
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
