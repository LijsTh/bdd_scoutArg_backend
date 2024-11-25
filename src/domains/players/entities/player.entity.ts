import { players } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerEntity implements players {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  position: string;
  @ApiProperty()
  number: number;
  @ApiProperty({ required: false, nullable: true })
  team_id: string | null;
  @ApiProperty({ required: false, nullable: true })
  team?: { id: string; name: string } | null;
}