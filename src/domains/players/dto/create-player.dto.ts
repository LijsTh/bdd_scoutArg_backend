import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name is required.' })
    @ApiProperty({ type: String, example: 'John Doe', description: 'Player name' })
    name: string;

    @IsNumber({}, { message: 'Age must be a number.' })
    @IsNotEmpty({ message: 'Age is required.' })
    @ApiProperty({ type: Number, example: 25, description: 'Player age' })
    age: number;

    @IsString({ message: 'Position must be a string.' })
    @IsNotEmpty({ message: 'Position is required.' })
    @ApiProperty({ type: String, example: 'Forward', description: 'Player position' })
    position: string;

    @IsNumber({}, { message: 'Shirt number must be a number.' })
    @IsNotEmpty({ message: 'Shirt number is required.' })
    @ApiProperty({ type: Number, example: 10, description: 'Player number' })
    number: number;

    @ApiProperty({ required: false, nullable: true, example: 'team123', description: 'Team ID' })
    team_id?: string; // Clave foránea hacia 'team', opcional
}
