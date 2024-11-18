import { PartialType } from '@nestjs/swagger';
import { CreateUsersPhotoDto } from './create-users_photo.dto';

export class UpdateUsersPhotoDto extends PartialType(CreateUsersPhotoDto) {}
