import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, Max, Min, IsDate } from 'class-validator';

export class CreateTeamOpinionDto {
    @ApiProperty({ example: 'user123', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @ApiProperty({ example: 'team123', description: 'Team ID' })
    @IsString()
    @IsNotEmpty()
    team_id: string;

    @ApiProperty({
        example: 'Team with great defense.',
        description: 'Opinion text',
    })
    @IsString()
    @IsNotEmpty()
    opinion_text: string;

    @ApiProperty({ example: 5, description: 'Team rating (1-5 stars)' })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({
        example: '2023-11-25T12:34:56.789Z',
        description: 'Creation date',
    })
    @IsNotEmpty({ message: 'Creation date is required.' })
    @IsDate({ message: 'Creation date must be date.' })
    @Type(() => Date)
    created_at: Date;

    @ApiProperty({ example: 'John Doe', description: 'Author name' })
    @IsNotEmpty({ message: 'Author name is required.' })
    @IsString({ message: 'Author name must be a string.' })
    author: string;
}
