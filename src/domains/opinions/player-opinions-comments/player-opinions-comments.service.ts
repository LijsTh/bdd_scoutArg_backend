import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { PlayersOpinionsCommentsRepository } from './player-opinions-comments.repository';
import { CreatePlayerOpinionDto } from './opinions_dtos/create-player-opinion.dto';
import { CreatePlayerCommentDto } from './comments_dtos/create-player-comment.dto';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { UpdatePlayerOpinionDto } from './opinions_dtos/update-player-opinion.dto';
import { UpdatePlayerCommentDto } from './comments_dtos/update-player-comment.dto';

@Injectable()
export class PlayerOpinionsCommentsService {
    constructor(
        private readonly repository: PlayersOpinionsCommentsRepository,
        private prisma: PrismaService,
    ) {}

    // -------------------------- Player Opinions --------------------------//

    async createOpinion(createOpinionDto: CreatePlayerOpinionDto) {
        const userExists = await this.prisma.users.findUnique({
            where: { id: createOpinionDto.user_id },
        });
        if (!userExists) {
            throw new NotFoundException(`User with ID ${createOpinionDto.user_id} not found`);
        }

        const playerExists = await this.prisma.players.findUnique({
            where: { id: createOpinionDto.player_id },
        });

        if (!playerExists) {
            throw new NotFoundException(`Player with ID ${createOpinionDto.player_id} not found`);
        }

        return await this.repository.createOpinion(createOpinionDto);
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

    async getOpinionsForPlayer(playerId: string) {
        try {
            const opinions = await this.repository.getOpinionsByPlayerId(playerId);
            if (!opinions) {
                throw new NotFoundException(`No opinions found for player with ID ${playerId}`);
            }
            return opinions;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error fetching opinions: ${error.message}`);
        }
    }

    async getOpinions() {
        try {
            return await this.repository.getOpinions();
        } catch (error) {
            throw new InternalServerErrorException(`Error fetching opinions: ${error.message}`);
        }
    }

    async updateOpinion(id: string, updateOpinionDto: UpdatePlayerOpinionDto) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: { id: updateOpinionDto.user_id },
            });
            if (!userExists) {
                throw new NotFoundException(`User with ID ${updateOpinionDto.user_id} not found`);
            }
            const playerExists = await this.prisma.players.findUnique({
                where: { id: updateOpinionDto.player_id },
            });

            if (!playerExists) {
                throw new NotFoundException(`Player with ID ${updateOpinionDto.player_id} not found`);
            }

            const opinion = await this.repository.getOpinionById(id);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            if (opinion.user_id !== updateOpinionDto.user_id) {
                throw new ConflictException('The user_id does not match the user_id of the opinion');
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

    async deleteOpinion(id: string, userID: string) {
        try {
            const opinion = await this.repository.getOpinionById(id);
            if (!opinion) {
                throw new NotFoundException(`Opinion with ID ${id} not found`);
            }
            if (opinion.user_id !== userID) {
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

    // -------------------------- Player Comments --------------------------//

    async addCommentToOpinion(opinionId: string, createCommentDto: CreatePlayerCommentDto) {
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

            return await this.repository.addComment(opinionId, createCommentDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error adding comment: ${error.message}`);
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

    async getCommentByIdForOpinion(opinionId: string, commentId: string) {
        try {
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

    async updateComment(opinionId: string, commentId: string, updateCommentDto: UpdatePlayerCommentDto) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: { id: updateCommentDto.user_id },
            });
            if (!userExists) {
                throw new NotFoundException(`User with ID ${updateCommentDto.user_id} not found`);
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
                throw new ConflictException('The user_id does not match the user_id of the comment');
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
