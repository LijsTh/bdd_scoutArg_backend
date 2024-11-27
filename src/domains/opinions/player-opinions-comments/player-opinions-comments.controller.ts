import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PlayerOpinionsCommentsService } from './player-opinions-comments.service';
import { CreatePlayerOpinionDto } from './opinions_dtos/create-player-opinion.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayerOpinionEntity } from './opinions_entity/player-opinion.entity';
import { CreatePlayerCommentDto } from './comments_dtos/create-player-comment.dto';
import { PlayerCommentEntity } from './comments_entity/player-comment.entity';
import { RequestErrorBuilder } from '../../../utils/exceptions/http-exception/request-error-builder';

@Controller('player-opinions')
@ApiTags('Player Opinions Comments')
export class PlayerOpinionsCommentsController {
    constructor(private readonly service: PlayerOpinionsCommentsService) {}

    // -------------------------- Player Opinions --------------------------//

    @Post('opinions')
    @ApiCreatedResponse({ type: CreatePlayerOpinionDto })
    async createOpinion(@Body() createOpinionDto: CreatePlayerOpinionDto): Promise<PlayerOpinionEntity> {
        try {
            const opinion = await this.service.createOpinion(createOpinionDto);
            return opinion;
        } catch (error) {
            if (error instanceof NotFoundException) {
                const instance = `/player-opinions/opinions?user_id=${createOpinionDto.user_id}&player_id=${createOpinionDto.player_id}`;
                throw RequestErrorBuilder.throwFormattedGetError('Opinion', instance, error.message);
            } else {
                throw RequestErrorBuilder.throwFormattedPostError('Opinion');
            }
        }
    }

    @Get('opinions/:id')
    @ApiOkResponse({ type: PlayerOpinionEntity })
    async getOpinion(@Param('id') id: string): Promise<PlayerOpinionEntity> {
        try {
            const opinion = await this.service.getOpinionById(id);
            return opinion;
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError(
                'Opinion',
                `/player-opinions/opinions/${id}`,
                `Opinion with ID ${id} not found`,
            );
        }
    }

    @Get('opinions')
    @ApiOkResponse({ type: [PlayerOpinionEntity] })
    async getOpinions(): Promise<PlayerOpinionEntity[]> {
        try {
            return await this.service.getOpinions();
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError('Opinion', '/player-opinions/opinions');
        }
    }

    @Patch('opinions/:id')
    @ApiOkResponse({ type: PlayerOpinionEntity })
    async updateOpinion(
        @Param('id') id: string,
        @Body() updateOpinionDto: CreatePlayerOpinionDto,
    ): Promise<PlayerOpinionEntity> {
        try {
            return await this.service.updateOpinion(id, updateOpinionDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw RequestErrorBuilder.throwFormattedGetError(
                    'Opinion',
                    `/player-opinions/opinions/${id}`,
                    error.message,
                );
            }
            throw RequestErrorBuilder.throwFormattedPatchError('Opinion', `/player-opinions/opinions/${id}`, id);
        }
    }

    @Delete('opinions/:id')
    @ApiNoContentResponse({ description: 'Opinion deleted' })
    async deleteOpinion(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.service.deleteOpinion(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw RequestErrorBuilder.throwFormattedGetError(
                    'Opinion',
                    `/player-opinions/opinions/${id}`,
                    error.message,
                );
            }
            throw RequestErrorBuilder.throwFormattedDeleteError('Opinion', `/player-opinions/opinions/${id}`, id);
        }
        res.status(HttpStatus.NO_CONTENT).send();
    }

    // -------------------------- Player Comments --------------------------//

    @Post('opinions/:opinionId/comments')
    @ApiCreatedResponse({ type: CreatePlayerCommentDto })
    async addComment(
        @Param('opinionId') opinionId: string,
        @Body() createCommentDto: CreatePlayerCommentDto,
    ): Promise<PlayerCommentEntity> {
        try {
            return await this.service.addCommentToOpinion(opinionId, createCommentDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                const instance = `/player-opinions/opinions/opinions?user_id=${createCommentDto.user_id}&opinion_id=${createCommentDto.player_opinion_id}`;
                throw RequestErrorBuilder.throwFormattedGetError('Opinion', instance, error.message);
            }
            throw RequestErrorBuilder.throwFormattedPostError('Comment');
        }
    }

    @Get('opinions/:opinionId/comments')
    @ApiOkResponse({ type: [PlayerCommentEntity] })
    async getComments(@Param('opinionId') opinionId: string): Promise<PlayerCommentEntity[]> {
        try {
            return await this.service.getCommentsForOpinion(opinionId);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError(
                'Comment',
                `/player-opinions/opinions/${opinionId}/comments`,
            );
        }
    }

    @Get('opinions/:opinionId/comments/:commentId')
    @ApiOkResponse({ type: PlayerCommentEntity })
    async getCommentByIdForOpinion(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
    ): Promise<PlayerCommentEntity> {
        try {
            return await this.service.getCommentByIdForOpinion(opinionId, commentId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw RequestErrorBuilder.throwFormattedGetError(
                    'Comment',
                    `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
                    error.message,
                );
            }
            throw RequestErrorBuilder.throwFormattedGetError(
                'Comment',
                `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
            );
        }
    }

    @Patch('opinions/:opinionId/comments/:commentId')
    @ApiOkResponse({ type: PlayerCommentEntity })
    async updateComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Body() updateCommentDto: CreatePlayerCommentDto,
    ): Promise<PlayerCommentEntity> {
        try {
            return await this.service.updateComment(opinionId, commentId, updateCommentDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw RequestErrorBuilder.throwFormattedGetError(
                    'Comment',
                    `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
                    error.message,
                );
            }
            throw RequestErrorBuilder.throwFormattedPatchError(
                'Comment',
                `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
                commentId,
            );
        }
    }

    @Delete('opinions/:opinionId/comments/:commentId')
    @ApiNoContentResponse({ description: 'Comment deleted' })
    async deleteComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Res() res: Response,
    ) {
        try {
            await this.service.deleteComment(opinionId, commentId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw RequestErrorBuilder.throwFormattedGetError(
                    'Comment',
                    `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
                    error.message,
                );
            }
            throw RequestErrorBuilder.throwFormattedDeleteError(
                'Comment',
                `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
                commentId,
            );
        }
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
