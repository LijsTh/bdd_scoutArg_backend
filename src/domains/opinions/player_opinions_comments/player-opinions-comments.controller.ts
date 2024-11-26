import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException } from '@nestjs/common';
import { PlayerOpinionsCommentsService } from './player-opinions-comments.service';
import { CreatePlayerOpinionDto } from './opinions_dtos/create-player-opinion.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayerOpinionEntity } from './opinions_entity/player-opinion.entity';
import { CreatePlayerCommentDto } from './comments_dtos/create-player-comment.dto';
import { PlayerCommentEntity } from './comments_entity/player-comment.entity';
import { RequestErrorBuilder } from '../../../exceptions/http-exception/request-error-builder';

@Controller('player-opinions')
@ApiTags('Player Opinions Comments')
export class PlayerOpinionsCommentsController {
    constructor(private readonly service: PlayerOpinionsCommentsService) {}

    // -------------------------- Player Opinions --------------------------//

    @Post('opinions')
    @ApiCreatedResponse({ type: CreatePlayerOpinionDto })
    async createOpinion(@Body() createOpinionDto: CreatePlayerOpinionDto) {
        try {
            return await this.service.createOpinion(createOpinionDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPostError('Opinion');
        }
    }

    @Get('opinions/:id')
    @ApiOkResponse({ type: PlayerOpinionEntity })
    async getOpinion(@Param('id') id: string) {
        try {
            return await this.service.getOpinionById(id);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError('Opinion', `/player-opinions/opinions/${id}`);
        }
    }

    @Get('opinions')
    @ApiOkResponse({ type: [PlayerOpinionEntity] })
    async getOpinions() {
        try {
            return await this.service.getOpinions();
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError('Opinion', '/player-opinions/opinions');
        }
    }

    @Patch('opinions/:id')
    @ApiOkResponse({ type: PlayerOpinionEntity })
    async updateOpinion(@Param('id') id: string, @Body() updateOpinionDto: CreatePlayerOpinionDto) {
        try {
            return await this.service.updateOpinion(id, updateOpinionDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPatchError('Opinion', `/player-opinions/opinions/${id}`, id);
        }
    }

    @Delete('opinions/:id')
    @ApiOkResponse({ type: PlayerOpinionEntity })
    async deleteOpinion(@Param('id') id: string) {
        try {
            return await this.service.deleteOpinion(id);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedDeleteError('Opinion', `/player-opinions/opinions/${id}`, id);
        }
    }

    // -------------------------- Player Comments --------------------------//

    @Post('opinions/:opinionId/comments')
    @ApiCreatedResponse({ type: CreatePlayerCommentDto })
    async addComment(@Param('opinionId') opinionId: string, @Body() createCommentDto: CreatePlayerCommentDto) {
        try {
            return await this.service.addCommentToOpinion(opinionId, createCommentDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPostError('Comment');
        }
    }

    @Get('opinions/:opinionId/comments')
    @ApiOkResponse({ type: [PlayerCommentEntity] })
    async getComments(@Param('opinionId') opinionId: string) {
        try {
            return await this.service.getCommentsForOpinion(opinionId);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError(
                'Comment',
                `/player-opinions/opinions/${opinionId}/comments`,
            );
        }
    }

    @Patch('opinions/:opinionId/comments/:commentId')
    @ApiOkResponse({ type: PlayerCommentEntity })
    async updateComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Body() updateCommentDto: CreatePlayerCommentDto,
    ) {
        try {
            return await this.service.updateComment(opinionId, commentId, updateCommentDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPatchError(
                'Comment',
                `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
                commentId,
            );
        }
    }

    @Delete('opinions/:opinionId/comments/:commentId')
    @ApiOkResponse({ type: PlayerCommentEntity })
    async deleteComment(@Param('opinionId') opinionId: string, @Param('commentId') commentId: string) {
        try {
            return await this.service.deleteComment(opinionId, commentId);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedDeleteError(
                'Comment',
                `/player-opinions/opinions/${opinionId}/comments/${commentId}`,
                commentId,
            );
        }
    }
}
