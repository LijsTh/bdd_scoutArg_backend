import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString( {message: "Name must be a string."} )
    @IsNotEmpty( {message: "Name is required."} )
    @MinLength(3, {message: "Name must be at least 3 characters."})
    name: string;

    @IsEmail( {}, {message: "Email must be a valid email."} )
    @IsNotEmpty( {message: "Email is required."} )
    email: string;

    @IsString( {message: "Password must be a string."} )
    @IsNotEmpty( {message: "Password is required."} )
    @MinLength(6, {message: "Password must be at least 8 characters."})
    password: string;

    team_id?: string; // Clave foránea, puede ser opcional
    photo?: string;  // Foto del usuario, podría ser una URL o base64
}