import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { ValidateAdminMiddleware } from 'src/utils/middleware/middleware-admin';

@Module({
    imports: [PrismaModule],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateAdminMiddleware)
            .forRoutes(
                { path: '/players', method: RequestMethod.POST },
                { path: '/players/*', method: RequestMethod.PATCH },
                { path: '/players/*', method: RequestMethod.DELETE },
            );
    }
}
