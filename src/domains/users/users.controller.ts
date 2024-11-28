import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    Res,
    NotFoundException,
    Request,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto, LogInResponseDto } from './dto/login.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { createFormattedError } from '../../utils/exceptions/http-exception/formatted-exeption';
import { Prisma } from '@prisma/client';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            return new UserEntity(await this.usersService.create(createUserDto));
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError('Error creating User', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll(): Promise<UserEntity[]> {
        try {
            return await this.usersService.findAll();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError('Error obtaining Users', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    async findOne(@Param('id') id: string): Promise<UserEntity> {
        try {
            return await this.usersService.findOne(id);
        } catch (error) {
            const title = 'Error obtaining User';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Patch()
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: UserEntity })
    async update(@Body() updateUserDto: UpdateUserDto, @Request() req: any): Promise<UserEntity> {
        try {
            const id = req.user;
            return new UserEntity(await this.usersService.update(id, updateUserDto));
        } catch (error) {
            const title = 'Error updating User';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiNoContentResponse({ description: 'User deleted' })
    async remove(@Res() res: Response, @Request() req: any): Promise<void> {
        try {
            const id = req.user;
            await this.usersService.remove(id);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            const title = 'Error deleting User';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    @Post('login')
    @ApiOkResponse({ type: LogInResponseDto })
    async login(@Body() loginDto: LogInDto): Promise<LogInResponseDto> {
        try {
            const userData = await this.usersService.logIn(loginDto);
            return userData;
        } catch (error) {
            const title = 'Error logging in';
            if (error instanceof NotFoundException) {
                throw createFormattedError(title, HttpStatus.NOT_FOUND, error);
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error;
            }
            throw createFormattedError(title, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
}
