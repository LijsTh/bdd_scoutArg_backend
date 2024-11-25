import { Injectable } from '@nestjs/common';
import { TeamOpinionsRepository } from './team-opinions.repository';
import { CreateTeamOpinionDto } from './dtos/create-team-opinion.dto';
import { UpdateTeamOpinionDto } from './dtos/update-team-opinion.dto';

@Injectable()
export class TeamOpinionsService {
    constructor(private readonly repository: TeamOpinionsRepository) {}

    async create(dto: CreateTeamOpinionDto) {
        dto.created_at = new Date().toISOString();
        return this.repository.create(dto);
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findOne(id: string) {
        return this.repository.findOne(id);
    }

    async update(id: string, dto: UpdateTeamOpinionDto) {
        return this.repository.update(id, {
            ...dto,
            updated_at: new Date().toISOString(),
        });
    }

    async delete(id: string) {
        return this.repository.delete(id);
    }
}
