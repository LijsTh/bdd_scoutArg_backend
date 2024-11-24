import { users_photos } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UsersPhotoEntity implements users_photos {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  photo: Buffer;
  @ApiProperty()
  user: string;
}
