import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dtos';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    const res = await this.usersService.getUserById(id);
    return res;
  }

  @Post()
  async registerUser(@Body() body: CreateUserDto): Promise<User> {
    const res = await this.usersService.registerUser(body);
    return res;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
