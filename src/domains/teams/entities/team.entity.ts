import { teams } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/domains/users/entities/user.entity';
import { PlayerEntity } from 'src/domains/players/entities/player.entity';

export class TeamEntity implements teams {
    @ApiProperty({ example: 'team123', description: 'Team ID' })
    id: string;
    @ApiProperty({ example: 'Team name', description: 'Team name' })
    name: string;

    @ApiProperty({ type: [UserEntity], description: 'Team users' })
    users?: UserEntity[];
    constructor({ users, ...data }: Partial<TeamEntity>) {
        Object.assign(this, data);
        this.users = users ? users.map((user) => new UserEntity(user)) : [];
    }

    @ApiProperty({ type: [PlayerEntity], description: 'Team players' })
    players?: string[];
}
