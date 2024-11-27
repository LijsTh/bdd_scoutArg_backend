import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto, LogInResponseDto } from './dto/login.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PasswordService } from 'src/utils/passwords/password.service';
import { UserEntity } from './entities/user.entity';
import { JwtPayload, generateToken } from 'src/utils/auth/auth';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private readonly passwordService: PasswordService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        createUserDto.password = await this.passwordService.hashPassword(createUserDto.password);
        const user = await this.prisma.users.create({
            data: createUserDto,
            include: {
                team: true,
            },
        });
        return new UserEntity(user);
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.prisma.users.findMany({
            include: {
                team: true,
            },
        });
        return users.map((user) => new UserEntity(user));
    }

    async findOne(id: string): Promise<UserEntity> {
        const user = await this.prisma.users.findUnique({
            where: {
                id,
            },
            include: {
                team: true, // Incluye los detalles del equipo si existe
            },
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return new UserEntity(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        if (updateUserDto.password) {
            updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
        }
        const user = await this.prisma.users.update({
            where: {
                id,
            },
            data: {
                email: updateUserDto.email,
                name: updateUserDto.name,
                password: updateUserDto.password,
                team_id: updateUserDto.team_id ?? null, // Si no tiene equipo, se asigna null
            },
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return new UserEntity(user);
    }

    async remove(id: string): Promise<UserEntity> {
        const userDeleted = await this.prisma.users.delete({
            where: {
                id,
            },
        });
        if (!userDeleted) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return new UserEntity(userDeleted);
    }

    async logIn(loginDto: LogInDto): Promise<LogInResponseDto> {
        const user = await this.prisma.users.findUnique({
            where: {
                email: loginDto.email,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const passwordMatch = await this.passwordService.comparePasswords(loginDto.password, user.password);
        if (!passwordMatch) {
            throw new NotFoundException('Invalid password');
        }

        const payload: JwtPayload = { userID: user.id };
        const token = generateToken(payload);

        return {
            id: user.id,
            token,
        };
    }
}
