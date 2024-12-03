import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { TeamOpinionsCommentsRepository } from './team-opinions-comments.repository';
import { CreateTeamOpinionDto } from './opinions_dtos/create-team-opinion.dto';
import { CreateTeamCommentDto } from './comments_dtos/create-team-comment.dto';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class TeamOpinionsCommentsService {
    constructor(
        private readonly repository: TeamOpinionsCommentsRepository,
        private prisma: PrismaService,
    ) {}

    // -------------------------- Team Opinions --------------------------//

    async createOpinion(createOpinionDto: CreateTeamOpinionDto) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: { id: createOpinionDto.user_id },
            });
            if (!userExists) {
                throw new NotFoundException(`User with ID ${createOpinionDto.user_id} not found`);
            }

            const teamExists = await this.prisma.teams.findUnique({
                where: { id: createOpinionDto.team_id },
            });
            if (!teamExists) {
                throw new NotFoundException(`Team with ID ${createOpinionDto.team_id} not found`);
            }

            return await this.repository.createOpinion(createOpinionDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error creating opinion: ${error.message}`);
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

    async getOpinionsByTeamId(teamId: string) {
        try {
            const teamExists = await this.prisma.teams.findUnique({
                where: { id: teamId },
            });
            if (!teamExists) {
                throw new NotFoundException(`Team with ID ${teamId} not found`);
            }

            const opinions = await this.repository.getOpinionsByTeamId(teamId);
            if (!opinions) {
                throw new NotFoundException(`No opinions found for team with ID ${teamId}`);
            }
            return opinions;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error fetching opinions: ${error.message}`);
        }
    }

    async updateOpinion(id: string, updateOpinionDto: CreateTeamOpinionDto) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: { id: updateOpinionDto.user_id },
            });
            if (!userExists) {
                throw new NotFoundException(`User with ID ${updateOpinionDto.user_id} not found`);
            }

            const teamExists = await this.prisma.teams.findUnique({
                where: { id: updateOpinionDto.team_id },
            });
            if (!teamExists) {
                throw new NotFoundException(`Team with ID ${updateOpinionDto.team_id} not found`);
            }
            const opinion = await this.repository.getOpinionById(id);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            if (opinion.user_id !== updateOpinionDto.user_id) {
                throw new ConflictException(`The user_id does not match the user_id of the opinion`);
            }

            const updatedOpinion = await this.repository.updateOpinion(id, updateOpinionDto);
            if (!updatedOpinion) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            return updatedOpinion;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error updating opinion: ${error.message}`);
        }
    }

    async deleteOpinion(id: string, usedID: string) {
        try {
            const opinion = await this.repository.getOpinionById(id);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            if (opinion.user_id !== usedID) {
                throw new ConflictException('The user_id does not match the user_id of the opinion');
            }
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
            const userExists = await this.prisma.users.findUnique({
                where: { id: createCommentDto.user_id },
            });
            if (!userExists) {
                throw new NotFoundException(`User with ID ${createCommentDto.user_id} not found`);
            }

            const doc = await this.repository.getOpinionById(opinionId);
            if (!doc) {
                throw new NotFoundException(`Opinion with ID ${opinionId} not found`);
            }

            createCommentDto.opinion_team_id = opinionId;
            return await this.repository.addComment(createCommentDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error adding comment: ${error.message}`);
        }
    }

    async getCommentsForOpinion(opinionId: string) {
        try {
            const opinion = await this.repository.getOpinionById(opinionId);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${opinionId} not found`);
            }
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

    async getCommentByIdForOpinion(opinionId: string, commentId: string) {
        try {
            const opinion = await this.repository.getOpinionById(opinionId);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${opinionId} not found`);
            }
            const comment = await this.repository.getCommentByIdForOpinion(opinionId, commentId);
            if (!comment) {
                throw new NotFoundException(`Comment with ID ${commentId} not found for opinion with ID ${opinionId}`);
            }
            return comment;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error fetching comment: ${error.message}`);
        }
    }

    async updateComment(opinionId: string, commentId: string, updateCommentDto: CreateTeamCommentDto) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: { id: updateCommentDto.user_id },
            });
            if (!userExists) {
                throw new NotFoundException(`User with ID ${updateCommentDto.user_id} not found`);
            }

            const teamExists = await this.prisma.teams.findUnique({
                where: { id: updateCommentDto.opinion_team_id },
            });
            if (!teamExists) {
                throw new NotFoundException(`Team with ID ${updateCommentDto.opinion_team_id} not found`);
            }
            const opinion = await this.repository.getOpinionById(opinionId);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${opinionId} not found`);
            }

            const comment = await this.repository.getCommentByIdForOpinion(opinionId, commentId);
            if (!comment) {
                throw new NotFoundException(`Comment with ID ${commentId} not found for opinion with ID ${opinionId}`);
            }

            if (comment.user_id !== updateCommentDto.user_id) {
                throw new ConflictException(`The user_id does not match the user_id of the comment`);
            }

            const updatedComment = await this.repository.updateComment(opinionId, commentId, updateCommentDto);
            if (!updatedComment) {
                throw new NotFoundException(`Comment with ID ${commentId} not found for opinion with ID ${opinionId}`);
            }
            return updatedComment;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error updating comment: ${error.message}`);
        }
    }

    async deleteComment(opinionId: string, commentId: string, userId: string) {
        try {
            const opinion = await this.repository.getOpinionById(opinionId);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${opinionId} not found`);
            }
            if (opinion.user_id !== userId) {
                throw new ConflictException('The user_id does not match the user_id of the opinion');
            }
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
