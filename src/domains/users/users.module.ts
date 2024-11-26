import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { PasswordModule } from 'src/utils/passwords/password.module';

@Module({
    imports: [PrismaModule, PasswordModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
