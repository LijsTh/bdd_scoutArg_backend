import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { PasswordModule } from 'src/utils/passwords/password.module';
import { ValidateLoginMiddleware } from 'src/utils/middleware/middleware-auth';

@Module({
    imports: [PrismaModule, PasswordModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateLoginMiddleware)
            .forRoutes(
                { path: '/users', method: RequestMethod.PATCH },
                { path: '/users', method: RequestMethod.DELETE },
            );
    }
}
