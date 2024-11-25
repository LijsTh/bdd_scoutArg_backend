import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TeamOpinionsService } from './team-opinions.service';
import { CreateTeamOpinionDto } from './dtos/create-team-opinion.dto';
import { UpdateTeamOpinionDto } from './dtos/update-team-opinion.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('team-opinions')
@ApiTags('Team Opinions')
export class TeamOpinionsController {
    constructor(private readonly service: TeamOpinionsService) {}

    @Post()
    @ApiCreatedResponse({ type: CreateTeamOpinionDto })
    async create(@Body() dto: CreateTeamOpinionDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ type: CreateTeamOpinionDto, isArray: true })
    async findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateTeamOpinionDto })
    async findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: CreateTeamOpinionDto })
    async update(@Param('id') id: string, @Body() dto: UpdateTeamOpinionDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiCreatedResponse({ type: CreateTeamOpinionDto })
    async delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
