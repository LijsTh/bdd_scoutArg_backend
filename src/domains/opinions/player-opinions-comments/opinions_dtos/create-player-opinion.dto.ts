import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, Max, Min, isDate } from 'class-validator';

export class CreatePlayerOpinionDto {
    @ApiProperty({ example: 'user123', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @ApiProperty({ example: 'player123', description: 'Player ID' })
    @IsString()
    @IsNotEmpty()
    player_id: string;

    @ApiProperty({
        example: 'Player with great technique.',
        description: 'Opinion text',
    })
    @IsString()
    @IsNotEmpty()
    opinion_text: string;

    @ApiProperty({ example: 5, description: 'Player rating (1-5 stars)' })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    @IsString()
    @IsNotEmpty()
    created_at: string;
}
