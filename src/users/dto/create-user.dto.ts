export class CreateUserDto {
    email: string;
    name: string;
    password: string;
    team_id?: string; // Clave foránea, puede ser opcional
    photo?: string;  // Foto del usuario, podría ser una URL o base64
}
