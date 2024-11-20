import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamsPhotoDto {
    @ApiProperty()
    team_id: string;
    @ApiProperty()
    photo: string;
}
