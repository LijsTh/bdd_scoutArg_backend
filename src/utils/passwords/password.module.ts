import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
    providers: [PasswordService],
    exports: [PasswordService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class PasswordModule {}
