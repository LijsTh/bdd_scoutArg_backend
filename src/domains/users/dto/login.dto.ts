import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
export class LogInDto {
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email must be a valid email.' })
    @ApiProperty({ type: String, format: 'email', example: 'email@gmail.com' })
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    @IsString({ message: 'Password must be a string.' })
    @ApiProperty({ type: String, minLength: 8, example: 'password' })
    password: string;
}

export class LogInResponseDto {
    @ApiProperty({ type: String, example: 'Bearer token' })
    token: string;
    @ApiProperty({ type: String, example: 'User ID' })
    id: string;
}
