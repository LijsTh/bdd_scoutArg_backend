import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersPhotoDto {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  photo: string;
}
