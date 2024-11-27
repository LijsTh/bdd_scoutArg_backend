import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PlayerOpinionsCommentsController } from './player-opinions-comments.controller';
import { PlayerOpinionsCommentsService } from './player-opinions-comments.service';
import { PlayersOpinionsCommentsRepository } from './player-opinions-comments.repository';
import { FirebaseModule } from 'src/database/firebase/firebase.module';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { ValidateLoginMiddleware } from 'src/utils/middleware/middleware-auth';

@Module({
    imports: [FirebaseModule, PrismaModule],
    controllers: [PlayerOpinionsCommentsController],
    providers: [PlayerOpinionsCommentsService, PlayersOpinionsCommentsRepository],
})
export class PlayerOpinionsCommentsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateLoginMiddleware)
            .forRoutes(
                { path: '/players/opinions', method: RequestMethod.POST },
                { path: '/players/opinions/*', method: RequestMethod.PATCH },
                { path: '/players/opinions/*', method: RequestMethod.DELETE },
                { path: '/players/opinions/*/comments', method: RequestMethod.POST },
                { path: '/players/opinions/*/comments/*', method: RequestMethod.PATCH },
                { path: '/players/opinions/*/comments/*', method: RequestMethod.DELETE },
            );
    }
}
