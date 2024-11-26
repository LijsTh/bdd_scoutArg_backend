import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException } from '@nestjs/common';
import { TeamOpinionsCommentsService } from './team-opinions-comments.service';
import { CreateTeamOpinionDto } from './opinions_dtos/create-team-opinion.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamOpinionEntity } from './opinions_entity/team-opinion.entity';
import { CreateTeamCommentDto } from './comments_dtos/create-team-comment.dto';
import { TeamCommentEntity } from './comments_entity/team-comment.entity';
import { RequestErrorBuilder } from '../../../exceptions/http-exception/request-error-builder';

@Controller('team-opinions')
@ApiTags('Team Opinions Comments')
export class TeamOpinionsCommentsController {
    constructor(private readonly service: TeamOpinionsCommentsService) {}

    // -------------------------- Team Opinions --------------------------//

    @Post('opinions')
    @ApiCreatedResponse({ type: CreateTeamOpinionDto })
    async createOpinion(@Body() createOpinionDto: CreateTeamOpinionDto) {
        try {
            return await this.service.createOpinion(createOpinionDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPostError('Opinion');
        }
    }

    @Get('opinions/:id')
    @ApiOkResponse({ type: TeamOpinionEntity })
    async getOpinion(@Param('id') id: string) {
        try {
            return await this.service.getOpinionById(id);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError('Opinion', `/team-opinions/opinions/${id}`);
        }
    }

    @Get('opinions')
    @ApiOkResponse({ type: [TeamOpinionEntity] })
    async getOpinions() {
        try {
            return await this.service.getOpinions();
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError('Opinion', '/team-opinions/opinions');
        }
    }

    @Patch('opinions/:id')
    @ApiOkResponse({ type: TeamOpinionEntity })
    async updateOpinion(@Param('id') id: string, @Body() updateOpinionDto: CreateTeamOpinionDto) {
        try {
            return await this.service.updateOpinion(id, updateOpinionDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPatchError('Opinion', `/team-opinions/opinions/${id}`, id);
        }
    }

    @Delete('opinions/:id')
    @ApiOkResponse({ type: TeamOpinionEntity })
    async deleteOpinion(@Param('id') id: string) {
        try {
            return await this.service.deleteOpinion(id);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedDeleteError('Opinion', `/team-opinions/opinions/${id}`, id);
        }
    }

    // -------------------------- Team Comments --------------------------//

    @Post('opinions/:opinionId/comments')
    @ApiCreatedResponse({ type: CreateTeamCommentDto })
    async addComment(@Param('opinionId') opinionId: string, @Body() createCommentDto: CreateTeamCommentDto) {
        try {
            return await this.service.addCommentToOpinion(opinionId, createCommentDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPostError('Comment');
        }
    }

    @Get('opinions/:opinionId/comments')
    @ApiOkResponse({ type: [TeamCommentEntity] })
    async getComments(@Param('opinionId') opinionId: string) {
        try {
            return await this.service.getCommentsForOpinion(opinionId);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedGetError(
                'Comment',
                `/team-opinions/opinions/${opinionId}/comments`,
            );
        }
    }

    @Patch('opinions/:opinionId/comments/:commentId')
    @ApiOkResponse({ type: TeamCommentEntity })
    async updateComment(
        @Param('opinionId') opinionId: string,
        @Param('commentId') commentId: string,
        @Body() updateCommentDto: CreateTeamCommentDto,
    ) {
        try {
            return await this.service.updateComment(opinionId, commentId, updateCommentDto);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedPatchError(
                'Comment',
                `/team-opinions/opinions/${opinionId}/comments/${commentId}`,
                commentId,
            );
        }
    }

    @Delete('opinions/:opinionId/comments/:commentId')
    @ApiOkResponse({ type: TeamCommentEntity })
    async deleteComment(@Param('opinionId') opinionId: string, @Param('commentId') commentId: string) {
        try {
            return await this.service.deleteComment(opinionId, commentId);
        } catch (error) {
            throw RequestErrorBuilder.throwFormattedDeleteError(
                'Comment',
                `/team-opinions/opinions/${opinionId}/comments/${commentId}`,
                commentId,
            );
        }
    }
}
