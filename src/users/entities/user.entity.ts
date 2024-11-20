import { users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements users {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @Exclude()
    password: string;

    @ApiProperty( { required: false, nullable: true })
    team_id: string | null;

    @ApiProperty({ required: false, nullable: true })
    photo: { photo: Buffer; user_id: string } | null;
}