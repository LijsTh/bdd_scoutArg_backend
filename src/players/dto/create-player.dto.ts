export class CreatePlayerDto {
    name: string;
    age: number;
    position: string;
    number: number;
    photo?: string;
    team_id?: string; // Clave foránea hacia 'team', opcional
}
