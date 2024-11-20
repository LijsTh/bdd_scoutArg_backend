import { teams } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class TeamEntity implements teams {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty( { required: false, nullable: true })
    photo?: string;

    @ApiProperty({ required: false, type: [UserEntity] })
    users?: UserEntity[];
    constructor({ users, ...data }: Partial<TeamEntity>) {
        Object.assign(this, data);
        this.users = users ? users.map(user => new UserEntity(user)) : [];
    }

    @ApiProperty()
    players: string[];
}
