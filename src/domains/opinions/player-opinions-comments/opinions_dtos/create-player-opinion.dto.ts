import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, Max, Min, IsDate } from 'class-validator';

export class CreatePlayerOpinionDto {
    user_id?: string;

    @ApiProperty({ example: 'player123', description: 'Player ID' })
    @IsNotEmpty({ message: 'Player ID is required.' })
    @IsString({ message: 'Player ID must be a string.' })
    player_id: string;

    @ApiProperty({
        example: 'Player with great technique.',
        description: 'Opinion text',
    })
    @IsNotEmpty({ message: 'Opinion text is required.' })
    @IsString({ message: 'Opinion text must be a string.' })
    opinion_text: string;

    @ApiProperty({ example: 5, description: 'Player rating (1-5 stars)' })
    @IsNotEmpty({ message: 'Rating is required.' })
    @IsInt({ message: 'Rating must be a number.' })
    @Min(1, { message: 'Rating must be at least 1.' })
    @Max(5, { message: 'Rating must be at most 5.' })
    rating: number;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    @IsNotEmpty({ message: 'Creation date is required.' })
    @IsDate({ message: 'Creation date must be date.' })
    @Type(() => Date)
    created_at: Date;
}
