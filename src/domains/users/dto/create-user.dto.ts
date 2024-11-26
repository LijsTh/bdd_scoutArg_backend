import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    @MinLength(3, { message: 'Name must be at least 3 characters.' })
    @ApiProperty({ type: String, minLength: 3, example: 'John Doe' })
    name: string;

    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email must be a valid email.' })
    @ApiProperty({ type: String, format: 'email', example: 'email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    @IsString({ message: 'Password must be a string.' })
    @ApiProperty({ type: String, minLength: 8, example: 'password' })
    password: string;

    team_id?: string; // Clave foránea, puede ser opcional
}
