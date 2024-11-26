import { users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements users {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty({ example: 'user123', description: 'User ID' })
    id: string;

    @ApiProperty({ example: '[email]', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'User name', description: 'User name' })
    name: string;

    @Exclude()
    password: string;

    @ApiProperty({ required: false, nullable: true, example: 'team123', description: 'Team ID' })
    team_id: string | null;
}
