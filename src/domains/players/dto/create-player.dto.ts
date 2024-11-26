import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    @ApiProperty({ type: String, example: 'John Doe', description: 'Player name' })
    name: string;

    @IsNotEmpty({ message: 'Age is required.' })
    @IsNumber({}, { message: 'Age must be a number.' })
    @ApiProperty({ type: Number, example: 25, description: 'Player age' })
    age: number;

    @IsNotEmpty({ message: 'Position is required.' })
    @IsString({ message: 'Position must be a string.' })
    @ApiProperty({ type: String, example: 'Forward', description: 'Player position' })
    position: string;

    @IsNotEmpty({ message: 'Shirt number is required.' })
    @IsNumber({}, { message: 'Shirt number must be a number.' })
    @ApiProperty({ type: Number, example: 10, description: 'Player number' })
    number: number;

    @ApiProperty({ required: false, nullable: true, example: 'team123', description: 'Team ID' })
    team_id?: string; // Clave foránea hacia 'team', opcional
}
