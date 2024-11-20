import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
    @IsString( {message: "Name must be a string."} )
    @IsNotEmpty( {message: "Name is required."} )
    name: string;

    @IsNumber( {}, {message: "Age must be a number."} )
    @IsNotEmpty( {message: "Age is required."} )
    age: number;

    @IsString( {message: "Position must be a string."} )
    @IsNotEmpty( {message: "Position is required."} )
    position: string;

    @IsNumber( {}, {message: "Shirt number must be a number."} )
    @IsNotEmpty( {message: "Shirt number is required."} )
    number: number;

    photo?: string;
    team_id?: string; // Clave foránea hacia 'team', opcional
}
