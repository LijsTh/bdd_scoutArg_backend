import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TeamOpinionsCommentsController } from './team-opinions-comments.controller';
import { TeamOpinionsCommentsService } from './team-opinions-comments.service';
import { TeamOpinionsCommentsRepository } from './team-opinions-comments.repository';
import { FirebaseModule } from 'src/database/firebase/firebase.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ValidateLoginMiddleware } from 'src/utils/middleware/middleware-auth';

@Module({
    imports: [FirebaseModule, PrismaModule],
    controllers: [TeamOpinionsCommentsController],
    providers: [TeamOpinionsCommentsService, TeamOpinionsCommentsRepository],
})
export class TeamOpinionsCommentsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateLoginMiddleware)
            .forRoutes(
                { path: '/teams/opinions', method: RequestMethod.POST },
                { path: '/teams/opinions/*', method: RequestMethod.PATCH },
                { path: '/teams/opinions/*', method: RequestMethod.DELETE },
                { path: '/teams/opinions/*/comments', method: RequestMethod.POST },
                { path: '/teams/opinions/*/comments/*', method: RequestMethod.PATCH },
                { path: '/teams/opinions/*/comments/*', method: RequestMethod.DELETE },
            );
    }
}
