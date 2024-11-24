import { teams } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/domains/users/entities/user.entity';

export class TeamEntity implements teams {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false, nullable: true })
  photo?: { photo: Buffer; team_id: string } | null;

  @ApiProperty({ type: [UserEntity] })
  users?: UserEntity[];
  constructor({ users, ...data }: Partial<TeamEntity>) {
    Object.assign(this, data);
    this.users = users ? users.map((user) => new UserEntity(user)) : [];
  }

  @ApiProperty()
  players?: string[];
}
