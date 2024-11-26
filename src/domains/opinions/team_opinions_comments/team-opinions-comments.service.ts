import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TeamOpinionsCommentsRepository } from './team-opinions-comments.repository';
import { CreateTeamOpinionDto } from './opinions_dtos/create-team-opinion.dto';
import { CreateTeamCommentDto } from './comments_dtos/create-team-comment.dto';

@Injectable()
export class TeamOpinionsCommentsService {
    constructor(private readonly repository: TeamOpinionsCommentsRepository) {}

    // -------------------------- Team Opinions --------------------------//

    async createOpinion(createOpinionDto: CreateTeamOpinionDto) {
        try {
            return await this.repository.createOpinion(createOpinionDto);
        } catch (error) {
            throw new BadRequestException(`Error creating opinion: ${error.message}`);
        }
    }

    async getOpinionById(id: string) {
        try {
            const opinion = await this.repository.getOpinionById(id);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            return opinion;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error fetching opinion: ${error.message}`);
        }
    }

    async getOpinions() {
        try {
            return await this.repository.getOpinions();
        } catch (error) {
            throw new InternalServerErrorException(`Error fetching opinions: ${error.message}`);
        }
    }

    async updateOpinion(id: string, updateOpinionDto: CreateTeamOpinionDto) {
        try {
            const updatedOpinion = await this.repository.updateOpinion(id, updateOpinionDto);
            if (!updatedOpinion) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            return updatedOpinion;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(`Error updating opinion: ${error.message}`);
        }
    }

    async deleteOpinion(id: string) {
        try {
            const result = await this.repository.deleteOpinion(id);
            if (!result) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error deleting opinion: ${error.message}`);
        }
    }

    // -------------------------- Team Comments --------------------------//

    async addCommentToOpinion(opinionId: string, createCommentDto: CreateTeamCommentDto) {
        try {
            const opinion = await this.repository.getOpinionById(opinionId);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${opinionId} not found`);
            }
            return await this.repository.addComment(opinionId, createCommentDto);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(`Error adding comment: ${error.message}`);
        }
    }

    async getCommentsForOpinion(opinionId: string) {
        try {
            const comments = await this.repository.getCommentsForOpinion(opinionId);
            if (!comments) {
                throw new NotFoundException(`No comments found for opinion with ID ${opinionId}`);
            }
            return comments;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error fetching comments: ${error.message}`);
        }
    }

    async updateComment(opinionId: string, commentId: string, updateCommentDto: CreateTeamCommentDto) {
        try {
            const updatedComment = await this.repository.updateComment(opinionId, commentId, updateCommentDto);
            if (!updatedComment) {
                throw new NotFoundException(`Comment with ID ${commentId} not found for opinion with ID ${opinionId}`);
            }
            return updatedComment;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(`Error updating comment: ${error.message}`);
        }
    }

    async deleteComment(opinionId: string, commentId: string) {
        try {
            const result = await this.repository.deleteComment(opinionId, commentId);
            if (!result) {
                throw new NotFoundException(`Comment with ID ${commentId} not found for opinion with ID ${opinionId}`);
            }
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error deleting comment: ${error.message}`);
        }
    }
}
