import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    NotFoundException,
    Res,
    HttpStatus,
    Request,
    ConflictException,
} from '@nestjs/common';
import { Response } from 'express';
import { TeamOpinionsCommentsService } from './team-opinions-comments.service';
import { CreateTeamOpinionDto } from './opinions_dtos/create-team-opinion.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamOpinionEntity } from './opinions_entity/team-opinion.entity';
import { CreateTeamCommentDto } from './comments_dtos/create-team-comment.dto';
import { TeamCommentEntity } from './comments_entity/team-comment.entity';
import { createFormattedError } from 'src/utils/exceptions/http-exception/formatted-exeption';

@Controller('team')
@ApiTags('Team Opinions Comments')
export class TeamOpinionsCommentsController {
    constructor(private readonly service: TeamOpinionsCommentsService) {}

    // -------------------------- Team Opinions --------------------------//

    @Post('opinions')
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateTeamOpinionDto })
    async createOpinion(
        @Body() createOpinionDto: CreateTeamOpinionDto,
        @Request() req: any,
    ): Promise<TeamOpinionEntity> {
        try {
            createOpinionDto.user_id = req.user;
            return await this.service.createOpinion(createOpinionDto);
        } catch (error) {
            throw createFormattedError('Error creating Opinion', HttpStatus.INTERNAL_SERVER_ERROR, error);
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

    @Get('opinion/:id')
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

    @Get('opinions/:teamId')
    @ApiOkResponse({ type: [TeamOpinionEntity] })
    async getOpinionsByTeamId(@Param('teamId') teamId: string): Promise<TeamOpinionEntity[]> {
        try {
            return await this.service.getOpinionsByTeamId(teamId);
        } catch (error) {
            const title = 'Error obtaining Opinions';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Patch('opinions/:id')
    @ApiBearerAuth()
    @ApiOkResponse({ type: TeamOpinionEntity })
    async updateOpinion(
        @Param('id') id: string,
        @Body() updateOpinionDto: CreateTeamOpinionDto,
        @Request() req: any,
    ): Promise<TeamOpinionEntity> {
        try {
            updateOpinionDto.user_id = req.user;
            return await this.service.updateOpinion(id, updateOpinionDto);
        } catch (error) {
            const title = 'Error updating Opinion';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof ConflictException) {
                throw createFormattedError(title, HttpStatus.CONFLICT, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Delete('opinions/:id')
    @ApiBearerAuth()
    @ApiNoContentResponse({ description: 'Opinion deleted' })
    async deleteOpinion(@Param('id') id: string, @Res() res: Response, @Request() req: any): Promise<void> {
        try {
            const userID = req.user;
            await this.service.deleteOpinion(id, userID);
        } catch (error) {
            const title = 'Error deleting Opinion';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof ConflictException) {
                throw createFormattedError(title, HttpStatus.CONFLICT, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
        res.status(HttpStatus.NO_CONTENT).send();
    }

    // -------------------------- Team Comments --------------------------//

    @Post('opinions/:opinionId/comments')
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateTeamCommentDto })
    async addComment(
        @Param('opinionId') opinionId: string,
        @Body() createCommentDto: CreateTeamCommentDto,
        @Request() req: any,
    ): Promise<TeamCommentEntity> {
        try {
            createCommentDto.user_id = req.user;
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
    @ApiBearerAuth()
    @ApiOkResponse({ type: TeamCommentEntity })
    async updateComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Body() updateCommentDto: CreateTeamCommentDto,
        @Request() req: any,
    ): Promise<TeamCommentEntity> {
        try {
            updateCommentDto.user_id = req.user;
            return await this.service.updateComment(opinionId, commentId, updateCommentDto);
        } catch (error) {
            const title = 'Error updating Comment';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof ConflictException) {
                throw createFormattedError(title, HttpStatus.CONFLICT, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Delete('opinions/:opinionId/comments/:commentId')
    @ApiBearerAuth()
    @ApiNoContentResponse({ description: 'Comment deleted' })
    async deleteComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Res() res: Response,
        @Request() req: any,
    ): Promise<void> {
        try {
            await this.service.deleteComment(opinionId, commentId, req.user);
        } catch (error) {
            const title = 'Error deleting Comment';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof ConflictException) {
                throw createFormattedError(title, HttpStatus.CONFLICT, error);
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
