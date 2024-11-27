import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TeamOpinionsCommentsService } from './team-opinions-comments.service';
import { CreateTeamOpinionDto } from './opinions_dtos/create-team-opinion.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamOpinionEntity } from './opinions_entity/team-opinion.entity';
import { CreateTeamCommentDto } from './comments_dtos/create-team-comment.dto';
import { TeamCommentEntity } from './comments_entity/team-comment.entity';
import { createFormattedError } from 'src/utils/exceptions/http-exception/formatted-exeption';

@Controller('team-opinions')
@ApiTags('Team Opinions Comments')
export class TeamOpinionsCommentsController {
    constructor(private readonly service: TeamOpinionsCommentsService) {}

    // -------------------------- Team Opinions --------------------------//

    @Post('opinions')
    @ApiCreatedResponse({ type: CreateTeamOpinionDto })
    async createOpinion(@Body() createOpinionDto: CreateTeamOpinionDto): Promise<TeamOpinionEntity> {
        try {
            return await this.service.createOpinion(createOpinionDto);
        } catch (error) {
            throw createFormattedError('Error creating Opinion', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get('opinions/:id')
    @ApiOkResponse({ type: TeamOpinionEntity })
    async getOpinion(@Param('id') id: string): Promise<TeamOpinionEntity> {
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
    @ApiOkResponse({ type: [TeamOpinionEntity] })
    async getOpinions(): Promise<TeamOpinionEntity[]> {
        try {
            return await this.service.getOpinions();
        } catch (error) {
            throw createFormattedError('Error obtaining Opinions', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Patch('opinions/:id')
    @ApiOkResponse({ type: TeamOpinionEntity })
    async updateOpinion(
        @Param('id') id: string,
        @Body() updateOpinionDto: CreateTeamOpinionDto,
    ): Promise<TeamOpinionEntity> {
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
    async deleteOpinion(@Param('id') id: string, @Res() res: Response): Promise<void> {
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

    // -------------------------- Team Comments --------------------------//

    @Post('opinions/:opinionId/comments')
    @ApiCreatedResponse({ type: CreateTeamCommentDto })
    async addComment(
        @Param('opinionId') opinionId: string,
        @Body() createCommentDto: CreateTeamCommentDto,
    ): Promise<TeamCommentEntity> {
        try {
            return await this.service.addCommentToOpinion(opinionId, createCommentDto);
        } catch (error) {
            throw createFormattedError('Error creating Comment', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get('opinions/:opinionId/comments')
    @ApiOkResponse({ type: [TeamCommentEntity] })
    async getComments(@Param('opinionId') opinionId: string): Promise<TeamCommentEntity[]> {
        try {
            return await this.service.getCommentsForOpinion(opinionId);
        } catch (error) {
            const title = 'Error obtaining Comments';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Patch('opinions/:opinionId/comments/:commentId')
    @ApiOkResponse({ type: TeamCommentEntity })
    async updateComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Body() updateCommentDto: CreateTeamCommentDto,
    ): Promise<TeamCommentEntity> {
        try {
            return await this.service.updateComment(opinionId, commentId, updateCommentDto);
        } catch (error) {
            const title = 'Error updating Comment';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
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
            const title = 'Error deleting Comment';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
