import { Module, Global } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
    providers: [FirebaseService],
    exports: [FirebaseService], // Permite que otros módulos accedan a FirebaseService
})
export class FirebaseModule {}
