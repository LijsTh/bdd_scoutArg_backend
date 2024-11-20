export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    team_id?: string; // Clave foránea, puede ser opcional
    photo?: string;  // Foto del usuario, podría ser una URL o base64
}
