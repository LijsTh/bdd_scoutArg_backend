import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { RequestErrorBuilder } from '../../utils/exceptions/http-exception/request-error-builder';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.usersService.create(createUserDto);
        if (!user) {
            throw RequestErrorBuilder.throwFormattedPostError('User');
        }
        return new UserEntity(user);
    }

    @Get()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll(): Promise<UserEntity[]> {
        const users = await this.usersService.findAll();
        if (!users) {
            throw RequestErrorBuilder.throwFormattedGetError('User', '/users');
        }
        return users.map((user) => new UserEntity(user));
    }

    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    async findOne(@Param('id') id: string): Promise<UserEntity> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw RequestErrorBuilder.throwFormattedGetError('User', `/users/${id}`, `User with ID ${id} not found.`);
        }
        return new UserEntity(user);
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: UserEntity })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.usersService.update(id, updateUserDto);
        if (!user) {
            throw RequestErrorBuilder.throwFormattedPatchError('User', `/users/${id}`, id);
        }
        return new UserEntity(user);
    }

    @Delete(':id')
    @ApiOkResponse({ type: UserEntity })
    async remove(@Param('id') id: string): Promise<UserEntity> {
        const user = await this.usersService.remove(id);
        if (!user) {
            throw RequestErrorBuilder.throwFormattedDeleteError('User', `/users/${id}`, id);
        }
        return new UserEntity(user);
    }
}
