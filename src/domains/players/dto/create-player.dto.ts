import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  @ApiProperty({ type: String })
  name: string;

  @IsNumber({}, { message: 'Age must be a number.' })
  @IsNotEmpty({ message: 'Age is required.' })
  @ApiProperty({ type: Number })
  age: number;

  @IsString({ message: 'Position must be a string.' })
  @IsNotEmpty({ message: 'Position is required.' })
  @ApiProperty({ type: String })
  position: string;

  @IsNumber({}, { message: 'Shirt number must be a number.' })
  @IsNotEmpty({ message: 'Shirt number is required.' })
  @ApiProperty({ type: Number })
  number: number;

  photo?: { photo: Buffer; player_id: string }; // Foto del jugador, opcional
  team_id?: string; // Clave foránea hacia 'team', opcional
  team?: { id: string; name: string }; // Equipo asociado, opcional
}
