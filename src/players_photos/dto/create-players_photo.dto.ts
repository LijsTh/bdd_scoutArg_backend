import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayersPhotoDto {
    @ApiProperty()
    player_id: string;
    @ApiProperty()
    photo: string;
}
