import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        return hash(password, this.saltRounds);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }
}
