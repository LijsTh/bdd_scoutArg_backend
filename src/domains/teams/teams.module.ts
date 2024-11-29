import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { ValidateAdminMiddleware } from 'src/utils/middleware/middleware-admin';

@Module({
    imports: [PrismaModule],
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateAdminMiddleware)
            .forRoutes(
                { path: '/teams', method: RequestMethod.POST },
                { path: '/teams/*', method: RequestMethod.PATCH },
                { path: '/teams/*', method: RequestMethod.DELETE },
            );
    }
}
