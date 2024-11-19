import { users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements users {
    @ApiProperty()
    id: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    password: string;
    @ApiProperty( { required: false, nullable: true })
    team_id: string | null;
    @ApiProperty({ required: false, nullable: true })
    photo: Buffer | null;
}