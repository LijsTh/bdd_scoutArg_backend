import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @Matches(/^\d{5}$/, { message: 'Name must have 5 or more digits' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email must be a valid email',
  })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password: string;
}
