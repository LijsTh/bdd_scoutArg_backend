import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamOpinionsCommentsService } from '../opinions/team-opinions-comments/team-opinions-comments.service';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { ValidateAdminMiddleware } from 'src/utils/middleware/middleware-admin';
import { TeamOpinionsCommentsRepository } from '../opinions/team-opinions-comments/team-opinions-comments.repository';

@Module({
    imports: [PrismaModule],
    controllers: [TeamsController],
    providers: [TeamsService, TeamOpinionsCommentsService, TeamOpinionsCommentsRepository],
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
