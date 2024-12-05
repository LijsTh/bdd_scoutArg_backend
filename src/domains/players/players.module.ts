import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayerOpinionsCommentsService } from '../opinions/player-opinions-comments/player-opinions-comments.service';
import { PlayersOpinionsCommentsRepository } from '../opinions/player-opinions-comments/player-opinions-comments.repository';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { ValidateAdminMiddleware } from 'src/utils/middleware/middleware-admin';

@Module({
    imports: [PrismaModule],
    controllers: [PlayersController],
    providers: [PlayersService, PlayerOpinionsCommentsService, PlayersOpinionsCommentsRepository],
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
