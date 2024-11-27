import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PlayerOpinionsCommentsService } from './player-opinions-comments.service';
import { CreatePlayerOpinionDto } from './opinions_dtos/create-player-opinion.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayerOpinionEntity } from './opinions_entity/player-opinion.entity';
import { CreatePlayerCommentDto } from './comments_dtos/create-player-comment.dto';
import { PlayerCommentEntity } from './comments_entity/player-comment.entity';
import { createFormattedError } from 'src/utils/exceptions/http-exception/formatted-exeption';

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
            const title = 'Error creating Opinion';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get('opinions/:id')
    @ApiOkResponse({ type: PlayerOpinionEntity })
    async getOpinion(@Param('id') id: string): Promise<PlayerOpinionEntity> {
        try {
            return await this.service.getOpinionById(id);
        } catch (error) {
            const title = 'Error obtaining Opinion';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get('opinions')
    @ApiOkResponse({ type: [PlayerOpinionEntity] })
    async getOpinions(): Promise<PlayerOpinionEntity[]> {
        try {
            return await this.service.getOpinions();
        } catch (error) {
            throw createFormattedError('Error obtaining Opinions', HttpStatus.INTERNAL_SERVER_ERROR, error);
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
            const title = 'Error updating Opinion';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Delete('opinions/:id')
    @ApiNoContentResponse({ description: 'Opinion deleted' })
    async deleteOpinion(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.service.deleteOpinion(id);
        } catch (error) {
            const title = 'Error deleting Opinion';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
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
            throw createFormattedError('Error creating Comment', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get('opinions/:opinionId/comments')
    @ApiOkResponse({ type: [PlayerCommentEntity] })
    async getComments(@Param('opinionId') opinionId: string): Promise<PlayerCommentEntity[]> {
        try {
            return await this.service.getCommentsForOpinion(opinionId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw createFormattedError('Error obtaining Comments for Opinion', HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError('Error obtaining Comments for Opinion', HttpStatus.INTERNAL_SERVER_ERROR, error);
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
                throw createFormattedError('Error obtaining Comment', HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError('Error obtaining Comment', HttpStatus.INTERNAL_SERVER_ERROR, error);
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
                throw createFormattedError('Error updating Comment', HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError('Error updating Comment', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Delete('opinions/:opinionId/comments/:commentId')
    @ApiNoContentResponse({ description: 'Comment deleted' })
    async deleteComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Res() res: Response,
    ): Promise<void> {
        try {
            await this.service.deleteComment(opinionId, commentId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw createFormattedError('Error deleting Comment', HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError('Error deleting Comment', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
